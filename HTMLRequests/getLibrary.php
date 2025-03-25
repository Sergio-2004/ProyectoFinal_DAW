<?php
// Establecer las cabeceras CORS para permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

try {
    // Establecer la conexión a la base de datos SQLite
    $dbPath = 'C:\Users\sparrine\SQLite\betanet.db';
    $conn = new SQLite3($dbPath);

    // Obtener el user_id de los parámetros GET
    $user_id = $_GET['user_id'];

    // Preparar la consulta SQL para obtener los juegos de la biblioteca del usuario
    $stmt = $conn->prepare(
        "SELECT games.id as id, games.name as name, games.description as description, games.creator_id as creator_id
        FROM games
        JOIN libraries ON (games.id = libraries.game_id)
        WHERE libraries.user_id = :user_id;"
    );

    // Vincular el parámetro user_id a la consulta SQL
    $stmt->bindValue(':user_id', $user_id, SQLITE3_INTEGER);

    // Ejecutar la consulta y obtener el resultado
    $result = $stmt->execute();

    // Inicializar un array para almacenar los juegos de la biblioteca
    $library = [];

    // Verificar si se encontraron resultados y almacenarlos en el array
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $library[] = $row;
    }

    // Devolver los resultados como JSON
    echo json_encode($library);

    // Cerrar la conexión a la base de datos
    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    // Manejar cualquier excepción que ocurra
    echo "Error: " . $e->getMessage();
}
