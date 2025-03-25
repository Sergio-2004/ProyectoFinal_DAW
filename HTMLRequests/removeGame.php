<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $dbPath = 'C:\Users\sparrine\SQLite\betanet.db';
    $conn = new SQLite3($dbPath);

    $game_id = $_GET['game_id'];
    $game_name = $_GET['game_name'];

    // Initialize response array
    $response = [];

    // Prepare the SQL query to remove game
    $stmt = $conn->prepare("DELETE FROM games WHERE id = :game_id;");
    $stmt->bindValue(':game_id', $game_id, SQLITE3_INTEGER);

    if ($stmt->execute()) {
        $response[] = ['message' => "Juego eliminado correctamente."];

        $stmt = $conn->prepare("DELETE FROM libraries WHERE game_id = :game_id;");
        $stmt->bindValue(':game_id', $game_id, SQLITE3_INTEGER);
        if ($stmt->execute()) {
            $response[] = ['message' => "Juego eliminado de las bibliotecas correctamente."];
        }

        $path = '../src/assets/uploads/games/'.$game_name;
        unlink($path.'/'.$game_name.'.png');
        unlink($path.'/'.$game_name.'.zip');
        rmdir($path);
    } else {
        $response[] = ['error' => "Error al eliminar el juego."];
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    $response[] = ['error' => "Error: " . $e->getMessage()];
}

echo json_encode($response);