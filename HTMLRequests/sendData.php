<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Leer el cuerpo de la solicitud y decodificar el JSON
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data !== null) {
        $servername = "localhost";
        $username = "betanet_user";
        $password = "1234";
        $database = "betanet";

        // Establecer la conexión a la base de datos
        $conn = new mysqli($servername, $username, $password, $database);

        // Verificar la conexión
        if ($conn->connect_error) {
            echo json_encode(['error' => "Connection failed: " . $conn->connect_error]);
            exit();
        }

        // Preparar y ejecutar la consulta para obtener el id y el nombre de la tabla
        $stmt = $conn->prepare("SELECT id, table_name FROM data_index WHERE name = ? AND game_id = ?");
        $stmt->bind_param("si", $data["name"], $data["game_id"]);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            $tablename = $row['table_name'] . "-" . $row['id'];

            // Preparar y ejecutar la consulta para insertar o actualizar los datos
            $stmt = $conn->prepare(
                "INSERT INTO `$tablename` (player_id, recorded_date, value)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE
                recorded_date = VALUES(recorded_date), value = VALUES(value)"
            );
            $current_date = date("Y-m-d H:i:s");
            $stmt->bind_param("iss", $data["player_id"], $current_date, $data["value"]);

            if ($stmt->execute()) {
                echo json_encode(['message' => "Datos publicados o actualizados correctamente."]);
            } else {
                echo json_encode(['error' => "Error al insertar o actualizar los datos: " . $stmt->error]);
            }
        } else {
            echo json_encode(['error' => "No se encontró la tabla especificada."]);
        }

        // Cerrar la conexión a la base de datos
        $stmt->close();
        $conn->close();
    } else {
        // Datos JSON no válidos
        http_response_code(400); // Bad Request
        echo json_encode(['error' => "Datos JSON no válidos."]);
    }
} else {
    // La solicitud no es de tipo POST
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => "Esta ruta solo admite solicitudes POST."]);
}
