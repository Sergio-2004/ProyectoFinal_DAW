<?php
// Directorio donde se almacenan las imágenes
$uploadDirectory = '../uploads/forums/';

// Verifica si se ha recibido el nombre del archivo como parámetro
if (isset($_GET['forum_id']) && isset($_GET['post_title'])) {
    // Construye la ruta completa del archivo
    $filePath = $uploadDirectory . $_GET['forum_id'] .'/'. $_GET['post_title'];

    // Verifica si el archivo existe
    if (file_exists($filePath)) {
        // Establece las cabeceras de la respuesta para indicar que se va a devolver una imagen
        header('Content-Type: image/jpeg'); // Ajusta el tipo de contenido según el tipo de imagen

        // Lee el contenido del archivo y lo imprime en la salida
        readfile($filePath);
    } else {
        // Si el archivo no existe, devuelve un error
        header('HTTP/1.0 404 Not Found');
        echo 'Archivo no encontrado';
    }
} else {
    // Si no se proporcionó un nombre de archivo, devuelve un error
    header('HTTP/1.0 400 Bad Request');
    echo 'Nombre de archivo no proporcionado';
}
?>
