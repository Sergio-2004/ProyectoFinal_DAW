<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

try {
    $dbPath = 'C:\Users\sparrine\SQLite\betanet.db';
    $conn = new SQLite3($dbPath);

    $name = $_GET['name'];
    $game_id = $_GET['game_id'];

    // Insert into data_index
    $stmt = $conn->prepare(
        "INSERT INTO data_index (name, game_id, table_name) VALUES (:name, :game_id, :table_name);"
    );
    $table_name = $name . "-" . $game_id;
    $stmt->bindValue(':name', $name, SQLITE3_TEXT);
    $stmt->bindValue(':game_id', $game_id, SQLITE3_INTEGER);
    $stmt->bindValue(':table_name', $table_name, SQLITE3_TEXT);

    if ($stmt->execute()) {
        echo json_encode(['success' => "Data parameter created successfully."]);
    } else {
        echo json_encode(['error' => "Error inserting data: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
