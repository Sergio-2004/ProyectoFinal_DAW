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
try{
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Obtener el nombre de usuario desde la solicitud GET (puedes pasarlo como parámetro en la URL)
$user_id = $_GET['user_id'];

// Consulta SQL para obtener la imagen del usuario de la base de datos
$stmt = $conn->prepare(
    "SELECT users.id as id, users.username as username, profiles.description as description, profiles.picture as picture FROM users
    JOIN profiles ON(users.id=profiles.user_id)
    WHERE profiles.user_id = ?;");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontró un resultado
if ($result->num_rows > 0) {
    // Obtener los datos de la imagen de la fila de resultados
    $row = $result->fetch_assoc();
    echo json_encode(['id' => $row['id'], 'username'=>$row['username'], 'description'=>$row['description']]);
    echo ['picture' => $row['picture']];
}

// Cerrar la conexión a la base de datos
$stmt->close();
$conn->close();
}catch(Exception $e){
    echo "Error: " . $e->getMessage();
}
