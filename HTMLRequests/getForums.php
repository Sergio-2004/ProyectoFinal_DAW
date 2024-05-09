<?php
// Establecer las cabeceras CORS para permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
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

  // Consulta SQL para obtener los foros de la base de datos
  $stmt = $conn->prepare(
      "SELECT * FROM forums;");
  $stmt->execute();
  $result = $stmt->get_result();

  // Verificar si se encontraron resultados
  while ( $row = mysqli_fetch_assoc( $result )){
      $forumList[] = $row;
  }
  echo json_encode($forumList);

  // Cerrar la conexión a la base de datos
  $stmt->close();
  $conn->close();
}catch(Exception $e){
    echo "Error: " . $e->getMessage();
}
