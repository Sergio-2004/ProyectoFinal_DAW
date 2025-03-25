<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $dbPath = 'C:\Users\sparrine\SQLite\betanet.db';
    $conn = new SQLite3($dbPath);

    $post_id = $_GET['post_id'];

    // Prepare the SQL query to get comments
    $stmt = $conn->prepare(
        "SELECT users.username as username, comments.content as content, comments.date as date
        FROM comments
        JOIN users ON (comments.user_id = users.id)
        WHERE comments.post_id = :post_id;"
    );
    $stmt->bindValue(':post_id', $post_id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    $comment = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $comment[] = $row;
    }

    echo json_encode($comment);

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}