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

// Verificar la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Obtener el nombre de usuario desde la solicitud GET (puedes pasarlo como parámetro en la URL)
$user_id = $_GET['user_id'];

// Consulta SQL para obtener la imagen del usuario de la base de datos
$stmt = $conn->prepare("SELECT picture FROM profiles WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontró un resultado
if ($result->num_rows > 0) {
    // Obtener los datos de la imagen de la fila de resultados
    $row = $result->fetch_assoc();

    // Establecer las cabeceras de la respuesta con el tipo MIME adecuado (asumiendo que la imagen se almacena como un blob en la base de datos)
    header("Content-Type: image/jpeg"); // Cambia esto según el tipo MIME de tus imágenes

    // Imprimir el contenido de la imagen
    echo $row['picture'];
} else {
    // Si no se encontró ninguna imagen para el usuario, devolver un código de estado 404 y un mensaje de error
    http_response_code(404);
    echo "No se encontró ninguna imagen para el usuario: $user_id";
}

// Cerrar la conexión a la base de datos
$stmt->close();
$conn->close();