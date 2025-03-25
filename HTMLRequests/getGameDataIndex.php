<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $dbPath = 'C:\Users\sparrine\SQLite\betanet.db';
    $conn = new SQLite3($dbPath);

    $game_id = $_GET['game_id'];

    // Prepare the SQL query to get game data index
    $stmt = $conn->prepare(
        "SELECT * FROM data_index WHERE game_id = :game_id;"
    );
    $stmt->bindValue(':game_id', $game_id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    $data = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}