<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
// Check if the request is a POST request
try{
  if ($_GET) {

      $username = $_GET["username"];
      $password = $_GET["password"];

      $conexion = new SQLite3('C:\Users\sparrine\SQLite\betanet.db');

      $sql="INSERT INTO users (username, password)
            VALUES (?, ?);";
      $stmt = $conexion->prepare($sql);
      $stmt->bindValue("ss", $username, $password);
      $stmt->execute();

      $sql="INSERT INTO profiles (user_id)
            SELECT id
            FROM users
            WHERE username = ?;";
      $stmt = $conexion->prepare($sql);
      $stmt->bindValue("s", $username);
      $stmt->execute();


      $sql="SELECT users.password as password, users.id as id, users.username as username, profiles.description as description
            FROM users
            JOIN profiles ON (users.id = profiles.user_id)
            WHERE username = ?;";
      $stmt = $conexion->prepare($sql);
      $stmt->bindValue("s", $username);
      $stmt->execute();
      $resultado = $stmt->execute()->fetchArray();
      if($resultado->num_rows == 0){
          echo json_encode(['message' => 'No username by that name']);
      }else if(($row = mysqli_fetch_assoc($resultado))["password"]!=$password){
          echo json_encode(['message' => 'Incorrect password']);
      }else{
          echo json_encode(['message' => 'Registration successful', 'user' => ['id' => $row['id'], 'username' => $row['username'], 'description' => $row['description']]]);
      }
      $stmt->close();
      mysqli_close($conexion);
      exit;
  }
}catch(Exception $e){
    echo json_encode(['message' => $e->getMessage()]);
}
