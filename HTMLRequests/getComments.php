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

$post_id = $_GET['post_id'];

// Verificar la conexión
try{
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // Consulta SQL para obtener los juegos de la base de datos
  $stmt = $conn->prepare(
      "SELECT users.username as username, comments.content as content, comments.date as date
      FROM comments
      JOIN users ON (comments.user_id = users.id)
      WHERE comments.post_id = ?;");
  $stmt->bind_param("i", $post_id);
  $stmt->execute();
  $result = $stmt->get_result();

  $comment = []; // Inicializar el arreglo fuera del bucle
  while ($row = mysqli_fetch_assoc($result)) {
      $comment[] = [
          'username' => $row['username'],
          'content' => $row['content'],
          'date' => $row['date']
      ];
  }

  echo json_encode($comment);

  // Cerrar la conexión a la base de datos
  $stmt->close();
  $conn->close();
}catch(Exception $e){
  echo "Error: " . $e->getMessage();
}
