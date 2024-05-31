<?php
$host = 'localhost';
$username = 'betanet_user';
$password = '1234';
$dbname = 'betanet';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("No se pudo conectar a la base de datos: " . $e->getMessage());
}

// Manejo de formularios
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'insert':
                $table = $_POST['table'];
                $columns = implode(", ", array_keys($_POST['data']));
                $values = implode(", ", array_map(function($value) { return "'$value'"; }, array_values($_POST['data'])));
                $query = "INSERT INTO $table ($columns) VALUES ($values)";
                $pdo->exec($query);
                break;

            case 'update':
                $table = $_POST['table'];
                $id = $_POST['id'];
                $updates = implode(", ", array_map(function($key, $value) { return "$key = '$value'"; }, array_keys($_POST['data']), array_values($_POST['data'])));
                $query = "UPDATE $table SET $updates WHERE id = $id";
                $pdo->exec($query);
                break;

            case 'delete':
                $table = $_POST['table'];
                $id = $_POST['id'];
                $query = "DELETE FROM $table WHERE id = $id";
                $pdo->exec($query);
                break;
        }
    }
}

$query = $pdo->query("SHOW TABLES");
$tables = $query->fetchAll(PDO::FETCH_COLUMN);

foreach ($tables as $table) {
    echo "<h2>Tabla: $table</h2>";

    $query = $pdo->query("SELECT * FROM `$table`");
    $entries = $query->fetchAll(PDO::FETCH_ASSOC);

    if (count($entries) > 0) {
        echo "<table border='1'>";
        echo "<tr>";
        foreach (array_keys($entries[0]) as $column) {
            echo "<th>$column</th>";
        }
        echo "<th>Acciones</th>";
        echo "</tr>";

        foreach ($entries as $entry) {
            echo "<tr>";
            foreach ($entry as $value) {
                echo "<td>$value</td>";
            }
            echo "<td>
                    <form method='POST'>
                        <input type='hidden' name='table' value='$table'>
                        <input type='hidden' name='id' value='{$entry['id']}'>
                        <input type='submit' name='action' value='delete' onclick='return confirm(\"¿Estás seguro?\")'>
                    </form>
                    <form method='POST'>
                        <input type='hidden' name='table' value='$table'>
                        <input type='hidden' name='id' value='{$entry['id']}'>
                        <input type='hidden' name='action' value='update'>
                        " . implode("", array_map(function($key, $value) {
                            return "<input type='text' name='data[$key]' value='$value'>";
                        }, array_keys($entry), $entry)) . "
                        <input type='submit' value='Actualizar'>
                    </form>
                  </td>";
            echo "</tr>";
        }

        echo "</table>";
    } else {
        echo "No hay entradas en esta tabla.";
    }

    // Formulario para insertar una nueva fila
    echo "<h3>Insertar nueva fila en $table</h3>";
    echo "<form method='POST'>";
    echo "<input type='hidden' name='table' value='$table'>";
    echo "<input type='hidden' name='action' value='insert'>";
    foreach ($pdo->query("DESCRIBE `$table`") as $column) {
        echo $column['Field'] . ": <input type='text' name='data[{$column['Field']}]'><br>";
    }
    echo "<input type='submit' value='Insertar'>";
    echo "</form>";
}
