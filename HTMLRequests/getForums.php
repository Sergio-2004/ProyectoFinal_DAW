<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $dbPath = 'C:\Users\sparrine\SQLite\betanet.db';
    $conn = new SQLite3($dbPath);

    // Prepare the SQL query to get forums
    $stmt = $conn->prepare("SELECT * FROM forums;");
    $result = $stmt->execute();

    $forumList = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $forumList[] = $row;
    }
    echo json_encode($forumList);

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}