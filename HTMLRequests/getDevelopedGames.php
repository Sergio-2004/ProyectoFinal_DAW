<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $dbPath = 'C:\Users\sparrine\SQLite\betanet.db';
    $conn = new SQLite3($dbPath);

    $user_id = $_GET['user_id'];

    // Prepare the SQL query to get developed games
    $stmt = $conn->prepare(
        "SELECT * FROM games WHERE creator_id = :user_id;"
    );
    $stmt->bindValue(':user_id', $user_id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    $games = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $games[] = $row;
    }
    echo json_encode($games);

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}