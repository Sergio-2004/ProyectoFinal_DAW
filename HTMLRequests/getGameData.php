<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $dbPath = 'C:\Users\sparrine\SQLite\betanet.db';
    $conn = new SQLite3($dbPath);

    $name = $_GET['name'];
    $game_id = $_GET['game_id'];

    // Prepare the SQL query to get game data
    $stmt = $conn->prepare(
        "SELECT * FROM data_index WHERE game_id = :game_id;"
    );
    $stmt->bindValue(':game_id', $game_id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    if ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $table_name = $row['table_name'] . '-' . $row['id'];
        $stmt = $conn->prepare(
            "SELECT users.username as player_name, `$table_name`.recorded_date as recorded_date, `$table_name`.value as value
            FROM `$table_name`
            JOIN users ON users.id = `$table_name`.player_id"
        );
        $result = $stmt->execute();

        $data = [];
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $data[] = $row;
        }
        echo json_encode($data);
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}