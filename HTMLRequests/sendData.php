<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Verificar si la solicitud es un POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Leer el cuerpo de la solicitud y decodificar el JSON
  $data = json_decode(file_get_contents('php://input'), true);

  // Procesar los datos recibidos
  if ($data !== null) {
    $conn = mysqli_connect("localhost","betanet_user","1234")
      or die("Connection error");
      mysqli_select_db($conn, "betanet")
      or die("Error connecting to database");

    $stmt = $conn->prepare(
      "SELECT *
      FROM data
      WHERE name = ? AND game_id = ? AND player_id = ?;");
    $stmt->bind_param("sii", $data["name"], $data["game_id"], $data["user_id"]);
    $stmt->execute();
    $result = $stmt->get_result();

    $current_date =  date("Y-m-d H:i:s");
    if($result->num_rows == 0){
      $stmt = $conn->prepare(
        "INSERT INTO data (name, value, game_id, player_id, recorded_date)
        VALUES (?, ?, ?, ?, ?);");
      $stmt->bind_param("ssiis", $data["name"], $data["highscore_value"], $data["game_id"], $data["user_id"], $current_date);
      if($stmt->execute()){
          echo "Data introduced correctly";
      } else {
          // Datos no válidos o faltantes
          http_response_code(400); // Bad Request
          echo "Error: Datos no válidos o faltantes en la solicitud.";
      }
    }else{
      $stmt = $conn->prepare(
        "UPDATE data
        SET value = ?, recorded_date = ?
        WHERE name = ? AND game_id = ? AND player_id = ?;");
      $stmt->bind_param("ssiis", $data["highscore_value"], $current_date, $data["name"], $data["game_id"], $data["user_id"], );
      if($stmt->execute()){
        echo "Data introduced correctly";
    } else {
        // Datos no válidos o faltantes
        http_response_code(400); // Bad Request
        echo "Error: Datos no válidos o faltantes en la solicitud.";
    }
    }
  } else {
      // La solicitud no es de tipo POST
      http_response_code(405); // Method Not Allowed
      echo "Error: Esta ruta solo admite solicitudes POST.";
  }
}
