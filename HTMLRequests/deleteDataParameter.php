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

    // Find the entry in data_index
    $stmt = $conn->prepare("SELECT * FROM data_index WHERE name = :name AND game_id = :game_id;");
    $stmt->bindValue(':name', $name, SQLITE3_TEXT);
    $stmt->bindValue(':game_id', $game_id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    if ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $id = $row['id'];
        $table_name = $row['table_name'] . "-" . $id;

        // Delete the entry from data_index
        $stmt = $conn->prepare("DELETE FROM data_index WHERE id = :id;");
        $stmt->bindValue(':id', $id, SQLITE3_INTEGER);

        if ($stmt->execute()) {
            echo json_encode(['success' => "Entry and table $table_name deleted successfully."]);
        } else {
            echo json_encode(['error' => "Error deleting data: " . $stmt->error]);
        }
    } else {
        echo json_encode(['error' => "No matching record found."]);
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
