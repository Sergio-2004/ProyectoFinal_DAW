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

$user_id = $_GET['user_id'];
$post_id = $_GET['post_id'];
$content = $_GET['content'];

// Verificar la conexión
try{
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // Consulta SQL para obtener los juegos de la base de datos
  $stmt = $conn->prepare(
      "INSERT INTO comments (user_id, post_id, content, date)
      VALUES (?, ?, ?, ?);");
  $current_date = date("Y-m-d");
  $stmt->bind_param("iiss", $user_id, $post_id, $content, $current_date);

    if ($stmt->execute()) {
        echo json_encode(['message' => "Imagen actualizada correctamente."]);;
    } else {
        echo json_encode(['error' => "Error al actualizar la imagen: " . $conn->error]);;
    }

  // Cerrar la conexión a la base de datos
  $stmt->close();
  $conn->close();
}catch(Exception $e){
  echo "Error: " . $e->getMessage();
}
