<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
// Check if the request is a POST request
try{
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $username = $_GET["username"];
    $password = $_GET["password"];

    $conexion = mysqli_connect("localhost","betanet_user","1234")
    or die("Connection error");
    mysqli_select_db($conexion, "betanet")
    or die("Error connecting to database");
    $sql="SELECT users.password as password, users.id as id, users.username as username, profiles.description as description, users.is_admin as isAdmin
          FROM users
          JOIN profiles ON (users.id = profiles.user_id)
          WHERE username = ?;";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $resultado = $stmt->get_result();
            if($resultado->num_rows == 0){
                echo json_encode(['message' => 'No username by that name']);
                exit;
            }else if(($row = mysqli_fetch_assoc($resultado))["password"]!=$password){
                echo json_encode(['message' => 'Incorrect password']);
                exit;
            }else{
                echo json_encode(['message' => 'Registration successful', 'user' => ['id' => $row['id'], 'username' => $row['username'], 'description' => $row['description'], 'isAdmin' => $row['isAdmin']]]);
                exit;
            }
            $stmt->close();
            mysqli_close($conexion);
}
}catch(Exception $e){
    echo json_encode(['message' => $e->getMessage()]);
}
