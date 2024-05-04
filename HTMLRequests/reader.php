<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $username = $_GET["username"];
    $password = $_GET["password"];

    $conexion = mysqli_connect("localhost","betanet_user","1234")
    or die("Connection error");
    mysqli_select_db($conexion, "betanet")
    or die("Error connecting to database");
    $sql="SELECT * FROM users WHERE username = ?;";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $resultado = $stmt->get_result();
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