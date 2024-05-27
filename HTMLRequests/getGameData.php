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

$name = $_GET['name'];
$game_id = $_GET['game_id'];

// Verificar la conexión
try{
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $stmt = $conn->prepare(
    "SELECT *
    FROM data_index
    WHERE game_id = ?;");
  $stmt->bind_param("i", $game_id);
  $stmt->execute();
  $result = $stmt->get_result();

  if($row = $result->fetch_assoc()) {
    $table_name = $row['table_name'].'-'.$row['id'];
    $stmt = $conn->prepare(
      "SELECT users.username as player_name, `$table_name`.recorded_date as recorded_date, `$table_name`.value as value
      FROM `$table_name`
      JOIN users ON users.id = `$table_name`.player_id");
  $stmt->execute();
  $result = $stmt->get_result();
  $data = [];
  // Verificar si se encontraron resultados
  while ( $row = mysqli_fetch_assoc( $result )){
      $data[] = $row;
  }
  echo json_encode($data);
  }

  // Cerrar la conexión a la base de datos
  $stmt->close();
  $conn->close();
}catch(Exception $e){
  echo "Error: " . $e->getMessage();
}
