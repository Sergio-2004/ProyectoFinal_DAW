<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $username = $_GET["username"];
    $password = $_GET["password"];

    $conexion = new SQLite3('C:\Users\sparrine\SQLite\betanet.db');
    $sql="SELECT * FROM users WHERE username = ?;";
            $stmt = $conexion->prepare($sql);
            $stmt->bindValue("s", $username);
            $stmt->execute();
            $resultado = $stmt->execute()->fetchArray();
            if($resultado->num_rows == 0){
                echo json_encode(['message' => 'No username by that name']);
                exit;
            }else if(mysqli_fetch_assoc($resultado)["password"]!=$password){
                echo json_encode(['message' => 'Incorrect password']);
                exit;
            }else{
                echo json_encode(['message' => 'Registration successful']);
                exit;
            }
}