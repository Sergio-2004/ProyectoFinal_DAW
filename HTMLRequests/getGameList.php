<?php
// Establecer las cabeceras CORS para permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


try {
    // Ruta al archivo de la base de datos SQLite
    $dbPath = 'C:\Users\sparrine\SQLite\betanet.db';
    $conn = new SQLite3($dbPath);

    // Consulta SQL para obtener los juegos de la base de datos
    $stmt = $conn->prepare("SELECT * FROM games;");
    $result = $stmt->execute();

    // Verificar si se encontraron resultados
    $gameList = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $gameList[] = $row;
    }
    echo json_encode($gameList);

    // Cerrar la conexión a la base de datos
    $conn->close();
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
