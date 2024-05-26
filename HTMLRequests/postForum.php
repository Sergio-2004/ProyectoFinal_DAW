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

$name = $_GET['forum_name'];
$description = $_GET['forum_description'];

// Verificar la conexión
try{
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }


  $stmt = $conn->prepare(
      "INSERT INTO forums (name, description)
      VALUES (?, ?);");
  $stmt->bind_param("ss", $name, $description);

    if ($stmt->execute()) {
        echo json_encode(['message' => "Foro subido correctamente."]);
        $stmt = $conn->prepare(
          "SELECT id
          FROM forums
          WHERE name = ?;");
        $stmt->bind_param("s", $name);
        $stmt->execute();
        $result = $stmt->get_result();
        mkdir('../src/assets/uploads/forums/'.mysqli_fetch_assoc($result)['id']);

    } else {
        echo json_encode(['error' => $conn->error]);;
    }

  // Cerrar la conexión a la base de datos
  $stmt->close();
  $conn->close();
}catch(Exception $e){
  echo $e->getMessage();
}
