<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Establecer la conexión a la base de datos
$servername = "localhost";
$user_id = "betanet_user";
$password = "1234";
$database = "betanet";

$conn = new mysqli($servername, $user_id, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Comprobar si se ha enviado una imagen
if (isset($_FILES['picture'])) {
    $picture = file_get_contents($_FILES['picture']['tmp_name']);
    $user_id = $_POST['user_id']; // Obtener el nombre de usuario desde la solicitud

    // Verificar si ya existe una entrada para este usuario
    $stmt_check = $conn->prepare("SELECT * FROM profiles WHERE user_id = ?");
    $stmt_check->bind_param("i", $user_id);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows > 0) {
        // Actualizar la entrada existente con la nueva imagen
        $stmt_update = $conn->prepare("UPDATE profiles SET picture = ? WHERE user_id = ?");
        $stmt_update->bind_param("si", $picture, $user_id);
        if ($stmt_update->execute()) {
            echo json_encode(['message' => "Imagen actualizada correctamente."]);;
        } else {
            echo json_encode(['error' => "Error al actualizar la imagen: " . $conn->error]);;
        }
        $stmt_update->close();
    }

    // Cerrar la conexión a la base de datos
    $stmt_check->close();
} else {
    echo json_encode(['error' => "Error al subir la imagen: " . $conn->error]);;
}

// Cerrar la conexión a la base de datos
$conn->close();