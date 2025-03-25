<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $dbPath = 'C:\Users\sparrine\SQLite\betanet.db';
    $conn = new SQLite3($dbPath);

    $user_id = $_GET['user_id'];
    $game_id = $_GET['game_id'];

    // Prepare the SQL query to insert if not exists
    $stmt = $conn->prepare(
        "INSERT INTO libraries (user_id, game_id)
        SELECT :user_id, :game_id WHERE NOT EXISTS (
            SELECT 1 FROM libraries WHERE user_id = :user_id AND game_id = :game_id
        );"
    );
    $stmt->bindValue(':user_id', $user_id, SQLITE3_INTEGER);
    $stmt->bindValue(':game_id', $game_id, SQLITE3_INTEGER);

    if ($stmt->execute()) {
        echo json_encode(['message' => "Juego guardado en la librería correctamente."]);
    } else {
        echo json_encode(['message' => "El juego ya está en la librería."]);
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(['error' => "Error: " . $e->getMessage()]);
}
