<?php
// Establecer las cabeceras CORS para permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Establecer la conexión a la base de datos
$servername = "localhost";
$user_id = "betanet_user";
$password = "1234";
$database = "betanet";

$conn = new mysqli($servername, $user_id, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(['error' => "Connection failed: " . $conn->connect_error]));
}

$name = $_GET['name'];
$game_id = $_GET['game_id'];

try {
    // Buscar la entrada en la tabla data_index
    $stmt = $conn->prepare("SELECT * FROM data_index WHERE name = ? AND game_id = ?;");
    $stmt->bind_param("si", $name, $game_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $id = $row['id'];
        $table_name = $row['table_name'] . "-" . $id;

        // Eliminar la entrada de la tabla data_index
        $stmt = $conn->prepare("DELETE FROM data_index WHERE id = ?;");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            // Eliminar la tabla dinámica
            $drop_table_sql = "DROP TABLE IF EXISTS `betanet`.`$table_name`;";
            if ($conn->query($drop_table_sql) === TRUE) {
                echo json_encode(['success' => "Entry and table $table_name deleted successfully."]);
            } else {
                echo json_encode(['error' => "Error dropping table: " . $conn->error]);
            }
        } else {
            echo json_encode(['error' => "Error deleting data: " . $stmt->error]);
        }
    } else {
        echo json_encode(['error' => "No matching record found."]);
    }

    // Cerrar la conexión a la base de datos
    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
