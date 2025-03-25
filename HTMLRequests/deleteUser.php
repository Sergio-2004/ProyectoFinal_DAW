<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

try {
    $dbPath = 'C:\Users\sparrine\SQLite\betanet.db';
    $conn = new SQLite3($dbPath);

    $user_id = $_GET['user_id'];

    // Begin transaction
    $conn->exec('BEGIN');

    // Prepare and execute the first query
    $stmt1 = $conn->prepare("DELETE FROM users WHERE id = :user_id");
    $stmt1->bindValue(':user_id', $user_id, SQLITE3_INTEGER);
    if (!$stmt1->execute()) {
        throw new Exception("Error deleting from users.");
    }

    // Prepare and execute the second query
    $stmt2 = $conn->prepare("DELETE FROM profiles WHERE user_id = :user_id");
    $stmt2->bindValue(':user_id', $user_id, SQLITE3_INTEGER);
    if (!$stmt2->execute()) {
        throw new Exception("Error deleting from profiles.");
    }

    // Prepare and execute the third query
    $stmt3 = $conn->prepare("DELETE FROM libraries WHERE user_id = :user_id");
    $stmt3->bindValue(':user_id', $user_id, SQLITE3_INTEGER);
    if (!$stmt3->execute()) {
        throw new Exception("Error deleting from libraries.");
    }

    // Commit transaction
    $conn->exec('COMMIT');
    echo json_encode(['message' => "Entry deleted successfully."]);

    $stmt1->close();
    $stmt2->close();
    $stmt3->close();
    $conn->close();
} catch (Exception $e) {
    // Rollback transaction on error
    $conn->exec('ROLLBACK');
    echo json_encode(['error' => $e->getMessage()]);
}