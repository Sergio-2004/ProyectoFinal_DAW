<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $dbPath = 'C:\Users\sparrine\SQLite\betanet.db';
    $conn = new SQLite3($dbPath);

    $user_id = $_GET['user_id'];
    $game_id = $_GET['game_id'];

    // Prepare the SQL query to remove game from library
    $stmt = $conn->prepare(
        "DELETE FROM libraries WHERE user_id = :user_id AND game_id = :game_id;"
    );
    $stmt->bindValue(':user_id', $user_id, SQLITE3_INTEGER);
    $stmt->bindValue(':game_id', $game_id, SQLITE3_INTEGER);

    if ($stmt->execute()) {
        echo json_encode(['message' => "Juego eliminado de la librería correctamente."]);
    } else {
        echo json_encode(['error' => "Error al eliminar el juego."]);
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}