<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $dbPath = 'C:\Users\sparrine\SQLite\betanet.db';
    $conn = new SQLite3($dbPath);

    $user_id = $_GET['user_id'];

    // Prepare the SQL query to get user image
    $stmt = $conn->prepare("SELECT image FROM profiles WHERE user_id = :user_id");
    $stmt->bindValue(':user_id', $user_id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    if ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        header("Content-Type: image/jpeg");
        echo $row['image'];
    } else {
        http_response_code(404);
        echo "No se encontró ninguna imagen para el usuario: $user_id";
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}