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

$dbPath = 'C:\Users\sparrine\SQLite\betanet.db';

$conn = new SQLite3($dbPath);

$forum_id = $_GET['forum_id'];

// Verificar la conexión
try{
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // Consulta SQL para obtener los juegos de la base de datos
  $stmt = $conn->prepare(
      "SELECT posts.id as post_id,
      posts.title as post_title,
      users.username as post_username,
      posts.content as post_content,
      posts.has_image as has_image,
      posts.date as date
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE posts.forum_id = ?;");
  $stmt->bindValue("i", $forum_id);
  $stmt->execute();
  $result = $stmt->execute()->fetchArray();

  $post = []; // Inicializar el arreglo fuera del bucle
  while ($row = mysqli_fetch_assoc($result)) {
      $post[] = [
          'id' => $row['post_id'],
          'title' => $row['post_title'],
          'username' => $row['post_username'],
          'content' => $row['post_content'],
          'hasImage' => $row['has_image'],
          'date' => $row['date']
      ];
  }

  echo json_encode($post);

  // Cerrar la conexión a la base de datos
  $stmt->close();
  $conn->close();
}catch(Exception $e){
  echo "Error: " . $e->getMessage();
}
