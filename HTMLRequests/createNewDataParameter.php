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
    // Insertar en la tabla data_index
    $stmt = $conn->prepare(
        "INSERT INTO data_index (name, game_id, table_name) VALUES (?, ?, ?);"
    );
    $table_name = $name ."-". $game_id;
    $stmt->bind_param("sis", $name, $game_id, $table_name);

    if ($stmt->execute()) {
        // Seleccionar el registro recién insertado
        $stmt = $conn->prepare(
            "SELECT * FROM data_index WHERE table_name = ?;"
        );
        $stmt->bind_param("s", $table_name);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            $tablename = $row['table_name'] ."-". $row['id'];
            // Crear una nueva tabla con el nombre dinámico
            $create_table_sql = "
                CREATE TABLE `betanet`.`$tablename` (
                    `player_id` INT(5) NOT NULL,
                    `recorded_date` DATE NOT NULL,
                    `value` VARCHAR(20) NOT NULL,
                    PRIMARY KEY (`player_id`)
                ) ENGINE=InnoDB;
            ";
            if ($conn->query($create_table_sql) === TRUE) {
                echo json_encode(['success' => "Table $tablename created successfully."]);
            } else {
                echo json_encode(['error' => "Error creating table: " . $conn->error]);
            }
        } else {
            echo json_encode(['error' => "Failed to retrieve the inserted data."]);
        }
    } else {
        echo json_encode(['error' => "Error inserting data: " . $stmt->error]);
    }

    // Cerrar la conexión a la base de datos
    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
