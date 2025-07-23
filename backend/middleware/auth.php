<?php
function requireAuth($allowed_roles = []) {
    $headers = getallheaders();
    $token = null;
    
    if (isset($headers['Authorization'])) {
        $auth_header = $headers['Authorization'];
        if (preg_match('/Bearer\s+(.*)$/i', $auth_header, $matches)) {
            $token = $matches[1];
        }
    }
    
    if (!$token) {
        http_response_code(401);
        echo json_encode(["message" => "Token akses diperlukan"]);
        exit();
    }
    
    try {
        $decoded = json_decode(base64_decode($token), true);
        
        if (!$decoded || !isset($decoded['user_id']) || !isset($decoded['exp'])) {
            throw new Exception("Token tidak valid");
        }
        
        if (time() > $decoded['exp']) {
            throw new Exception("Token sudah kadaluarsa");
        }
        
        // Check if user still exists and active
        include_once '../config/database.php';
        $database = new Database();
        $db = $database->getConnection();
        
        $query = "SELECT * FROM users WHERE id = :user_id AND is_active = 1";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":user_id", $decoded['user_id']);
        $stmt->execute();
        
        if ($stmt->rowCount() == 0) {
            throw new Exception("User tidak ditemukan");
        }
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Check role if specified
        if (!empty($allowed_roles) && !in_array($user['role'], $allowed_roles)) {
            http_response_code(403);
            echo json_encode(["message" => "Akses ditolak"]);
            exit();
        }
        
        // Set global user variable
        $GLOBALS['current_user'] = $user;
        
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["message" => "Token tidak valid"]);
        exit();
    }
}

function getCurrentUser() {
    return isset($GLOBALS['current_user']) ? $GLOBALS['current_user'] : null;
}
?>