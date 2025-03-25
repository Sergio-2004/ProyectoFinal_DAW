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

$id = $_GET['id'];

// Verificar la conexión
try{
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // Consulta SQL para obtener los juegos de la base de datos
  $stmt = $conn->prepare(
      "SELECT *
      FROM data
      WHERE id = ?;");
  $stmt->bindValue("i", $id);
  $stmt->execute();
  $result = $stmt->execute()->fetchArray();

  $data = [];
  // Verificar si se encontraron resultados
  if( $row = mysqli_fetch_assoc( $result )){
      $data[] = $row;
  }
  echo json_encode($data);

  // Cerrar la conexión a la base de datos
  $stmt->close();
  $conn->close();
}catch(Exception $e){
  echo "Error: " . $e->getMessage();
}
