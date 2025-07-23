<?php
include_once '../config/cors.php';
include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password)) {
    $query = "SELECT id, username, email, full_name, phone, address, role, password, avatar, is_active 
              FROM users 
              WHERE (username = :username OR email = :username) AND is_active = 1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(":username", $data->username);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (password_verify($data->password, $row['password'])) {
            $token = base64_encode(json_encode([
                'user_id' => $row['id'],
                'role' => $row['role'],
                'exp' => time() + (24 * 60 * 60) // 24 hours
            ]));
            
            unset($row['password']);
            
            http_response_code(200);
            echo json_encode([
                "message" => "Login berhasil",
                "token" => $token,
                "user" => $row
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Username atau password salah"]);
        }
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Username atau password salah"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Username dan password diperlukan"]);
}
?>