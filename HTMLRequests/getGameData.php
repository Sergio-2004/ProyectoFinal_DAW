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

// Verificar la conexión
try{
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // Consulta SQL para obtener los juegos de la base de datos
  $stmt = $conn->prepare(
      "SELECT *
      FROM data
      WHERE game_id = ?;");
  $stmt->bind_param("i", $game_id);
  $stmt->execute();
  $result = $stmt->get_result();

  $data = [];
  // Verificar si se encontraron resultados
  while ( $row = mysqli_fetch_assoc( $result )){
      $data[] = $row;
  }
  echo json_encode($data);

  // Cerrar la conexión a la base de datos
  $stmt->close();
  $conn->close();
}catch(Exception $e){
  echo "Error: " . $e->getMessage();
}
