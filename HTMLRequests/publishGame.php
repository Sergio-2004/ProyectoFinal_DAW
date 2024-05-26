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
$description = $_GET['description'];
$creator_id = $_GET['creator_id'];

// Verificar la conexión
try{
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }


  $stmt = $conn->prepare(
      "INSERT INTO games (name, description, creator_id)
      VALUES (?, ?, ?);");
  $stmt->bind_param("ssi", $name, $description, $creator_id);

    if ($stmt->execute()) {
        echo json_encode(['message' => "Juego subido correctamente."]);
        $stmt = $conn->prepare(
          "SELECT *
          FROM games
          WHERE name = ?;");
        $stmt->bind_param("s", $name);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = mysqli_fetch_assoc($result);
        mkdir('../src/assets/uploads/games/'.$row['name']);

        $stmt = $conn->prepare(
          "INSERT INTO libraries (user_id, game_id)
          SELECT ?, ? FROM DUAL
          WHERE NOT EXISTS (
              SELECT 1 FROM libraries WHERE user_id = ? AND game_id = ?
          );"
      );
      $stmt->bind_param("iiii", $row['creator_id'], $row['id'], $row['creator_id'], $row['id']);
      $stmt->execute();

    } else {
        echo json_encode(['error' => $conn->error]);;
    }

  // Cerrar la conexión a la base de datos
  $stmt->close();
  $conn->close();
}catch(Exception $e){
  echo $e->getMessage();
}
