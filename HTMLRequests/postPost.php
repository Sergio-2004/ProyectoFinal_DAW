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
$forum_id = $_GET['forum_id'];
$content = $_GET['content'];
$title = $_GET['title'];

// Verificar la conexión
try{
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // Consulta SQL para obtener los juegos de la base de datos
  $stmt = $conn->prepare(
      "INSERT INTO posts (user_id, forum_id, title, content)
      VALUES (?, ?, ?, ?);");
  $stmt->bind_param("iiss", $user_id, $forum_id, $title, $content);

    if ($stmt->execute()) {
        echo json_encode(['message' => "Post publicado correctamente."]);;
    } else {
        echo json_encode(['error' => $conn->error]);;
    }

  // Cerrar la conexión a la base de datos
  $stmt->close();
  $conn->close();
}catch(Exception $e){
  echo $e->getMessage();
}
