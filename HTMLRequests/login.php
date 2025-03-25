<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {

        $username = $_GET["username"];
        $password = $_GET["password"];

        $conexion = new SQLite3('C:\Users\sparrine\SQLite\betanet.db');
        
        $sql = "SELECT users.password as password, users.id as id, users.username as username, profiles.description as description, users.is_admin as isAdmin
                FROM users
                JOIN profiles ON (users.id = profiles.user_id)
                WHERE username = :username;";
        
        $stmt = $conexion->prepare($sql);
        $stmt->bindValue(':username', $username, SQLITE3_TEXT);
        $result = $stmt->execute();
        $row = $result->fetchArray(SQLITE3_ASSOC);
        
        if (!$row) {
            echo json_encode(['message' => 'No username by that name']);
            exit;
        } else if ($row["password"] != $password) {
            echo json_encode(['message' => 'Incorrect password']);
            exit;
        } else {
            echo json_encode(['message' => 'Registration successful', 'user' => ['id' => $row['id'], 'username' => $row['username'], 'description' => $row['description'], 'isAdmin' => $row['isAdmin']]]);
            exit;
        }
        
        $stmt->close();
        $conexion->close();
    }
} catch (Exception $e) {
    echo json_encode(['message' => $e->getMessage()]);
}
