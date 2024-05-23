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
$game_id = $_GET['game_id'];

// Verificar la conexión
try{
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $stmt = $conn->prepare(
      "DELETE FROM libraries
      WHERE user_id = ? AND game_id = ?;");
  $stmt->bind_param("ii", $user_id, $game_id, );

  if ($stmt->execute()) {
      echo json_encode(['message' => "Juego eliminado de la librería correctamente."]);;
  } else {
      echo json_encode(['error' => "Error al eliminar el juego: " . $conn->error]);;
  }

  // Cerrar la conexión a la base de datos
  $stmt->close();
  $conn->close();
}catch(Exception $e){
  echo "Error: " . $e->getMessage();
}
