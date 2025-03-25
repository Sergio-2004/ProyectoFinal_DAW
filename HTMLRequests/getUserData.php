<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $dbPath = 'C:\Users\sparrine\SQLite\betanet.db';
    $conexion = new SQLite3($dbPath);

    $user_id = $_GET['user_id'];

    // Prepare the SQL query to get user data
    $sql = "SELECT users.password as password, users.id as id, users.username as username, profiles.description as description, users.is_admin as isAdmin
            FROM users
            JOIN profiles ON (users.id = profiles.user_id)
            WHERE users.id = :user_id;";
    $stmt = $conexion->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    if ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        echo json_encode(['user' => ['id' => $row['id'], 'username' => $row['username'], 'description' => $row['description'], 'isAdmin' => $row['isAdmin']]]);
    } else {
        echo json_encode(['message' => 'No user found']);
    }

    $stmt->close();
    $conexion->close();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}