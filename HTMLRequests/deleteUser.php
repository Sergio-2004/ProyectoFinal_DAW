<?php
// Establecer las cabeceras CORS para permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Establecer la conexión a la base de datos
$servername = "localhost";
$username = "betanet_user";
$password = "1234";
$database = "betanet";

$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(['error' => "Connection failed: " . $conn->connect_error]));
}

$user_id = $_GET['user_id'];

try {
    // Iniciar una transacción
    $conn->begin_transaction();

    // Preparar y ejecutar la primera consulta
    $stmt1 = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt1->bind_param("i", $user_id);
    if (!$stmt1->execute()) {
        throw new Exception("Error deleting from users: " . $stmt1->error);
    }

    // Preparar y ejecutar la segunda consulta
    $stmt2 = $conn->prepare("DELETE FROM profiles WHERE user_id = ?");
    $stmt2->bind_param("i", $user_id);
    if (!$stmt2->execute()) {
        throw new Exception("Error deleting from profiles: " . $stmt2->error);
    }

    // Preparar y ejecutar la tercera consulta
    $stmt3 = $conn->prepare("DELETE FROM libraries WHERE user_id = ?");
    $stmt3->bind_param("i", $user_id);
    if (!$stmt3->execute()) {
        throw new Exception("Error deleting from libraries: " . $stmt3->error);
    }

    // Si todas las consultas se ejecutaron correctamente, confirmar la transacción
    $conn->commit();
    echo json_encode(['message' => "Entry deleted successfully."]);

    // Cerrar las declaraciones y la conexión a la base de datos
    $stmt1->close();
    $stmt2->close();
    $stmt3->close();
    $conn->close();
} catch (Exception $e) {
    // En caso de error, revertir la transacción
    $conn->rollback();
    echo json_encode(['error' => $e->getMessage()]);
    // Cerrar las declaraciones y la conexión a la base de datos si están abiertas
    if (isset($stmt1)) $stmt1->close();
    if (isset($stmt2)) $stmt2->close();
    if (isset($stmt3)) $stmt3->close();
    $conn->close();
}
