<?php
include_once '../config/cors.php';
include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->email) && !empty($data->password) && !empty($data->full_name)) {
    // Check if user already exists
    $check_query = "SELECT id FROM users WHERE username = :username OR email = :email";
    $check_stmt = $db->prepare($check_query);
    $check_stmt->bindParam(":username", $data->username);
    $check_stmt->bindParam(":email", $data->email);
    $check_stmt->execute();
    
    if ($check_stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(["message" => "Username atau email sudah digunakan"]);
    } else {
        $query = "INSERT INTO users (username, email, password, full_name, phone, address, role) 
                  VALUES (:username, :email, :password, :full_name, :phone, :address, :role)";
        
        $stmt = $db->prepare($query);
        
        $hashed_password = password_hash($data->password, PASSWORD_DEFAULT);
        $role = isset($data->role) ? $data->role : 'customer';
        
        $stmt->bindParam(":username", $data->username);
        $stmt->bindParam(":email", $data->email);
        $stmt->bindParam(":password", $hashed_password);
        $stmt->bindParam(":full_name", $data->full_name);
        $stmt->bindParam(":phone", $data->phone);
        $stmt->bindParam(":address", $data->address);
        $stmt->bindParam(":role", $role);
        
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Registrasi berhasil"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Terjadi kesalahan server"]);
        }
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Data tidak lengkap"]);
}
?>