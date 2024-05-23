<?php
// Establecer las cabeceras CORS para permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Establecer la conexión a la base de datos
$servername = "localhost";
$username = "betanet_user";
$password = "1234";
$database = "betanet";

$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Obtener los parámetros
$user_id = $_GET['user_id'];
$game_id = $_GET['game_id'];

try {
    // Preparar la consulta para verificar si ya existe la fila
    $stmt = $conn->prepare(
        "INSERT INTO libraries (user_id, game_id)
        SELECT ?, ? FROM DUAL
        WHERE NOT EXISTS (
            SELECT 1 FROM libraries WHERE user_id = ? AND game_id = ?
        );"
    );
    $stmt->bind_param("iiii", $user_id, $game_id, $user_id, $game_id);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['message' => "Juego guardado en la librería correctamente."]);
        } else {
            echo json_encode(['message' => "El juego ya está en la librería."]);
        }
    } else {
        echo json_encode(['error' => "Error al guardar el juego: " . $stmt->error]);
    }

    // Cerrar la conexión a la base de datos
    $stmt->close();
    $conn->close();
} catch(Exception $e) {
    echo "Error: " . $e->getMessage();
}
