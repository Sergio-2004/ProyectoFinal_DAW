<?php
// Establecer las cabeceras CORS para permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Establecer la conexión a la base de datos
$servername = "localhost";
$user_id = "betanet_user";
$password = "1234";
$database = "betanet";

$conn = new mysqli($servername, $user_id, $password, $database);

$game_id = $_GET['game_id'];
$game_name = $_GET['game_name'];

// Inicializar una array para almacenar los mensajes de respuesta
$response = [];

try {
    // Verificar la conexión
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare(
        "DELETE FROM games WHERE id = ?;"
    );
    $stmt->bind_param("i", $game_id);

    if ($stmt->execute()) {
        $response[] = ['message' => "Juego eliminado correctamente."];

        $stmt = $conn->prepare(
            "DELETE FROM libraries WHERE game_id = ?;"
        );
        $stmt->bind_param("i", $game_id);
        if ($stmt->execute()) {
            $response[] = ['message' => "Juego eliminado de las bibliotecas correctamente."];
        }

        $path = '../src/assets/uploads/games/'.$game_name;
        unlink($path.'/'.$game_name.'.png');
        unlink($path.'/'.$game_name.'.zip');
        rmdir($path);
    } else {
        $response[] = ['error' => $conn->error];
    }

    // Cerrar la conexión a la base de datos
    $stmt->close();
    $conn->close();
} catch(Exception $e) {
    $response[] = ['error' => "Error: " . $e->getMessage()];
}

// Devolver la respuesta JSON
echo json_encode($response);
