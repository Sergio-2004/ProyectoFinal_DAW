<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Verifica si se ha enviado un archivo
if ($_FILES['file']) {
    $errors = [];
    $fileTmpPath = $_FILES['file']['tmp_name'];
    $fileName = $_FILES['file']['name'];
    $fileSize = $_FILES['file']['size'];
    $fileType = $_FILES['file']['type'];
    $fileNameCmps = explode(".", $fileName);
    $fileExtension = strtolower(end($fileNameCmps));

    // Obtener el valor de "name" enviado desde Angular
    $name = $_POST['name'];

    // Directorio de destino para almacenar los archivos
    $uploadDirectory = '../src/assets/uploads/games/'.$name.'/';

    // Lista de extensiones de archivo permitidas
    $allowedExtensions = ["zip"];

    // Verifica si la extensión del archivo es válida
    if (in_array($fileExtension, $allowedExtensions)) {
        // Genera un nombre único para el archivo
        $newFileName = $name. '.' . $fileExtension;
        $uploadPath = $uploadDirectory . $newFileName;

        // Mueve el archivo al directorio de destino
        if (move_uploaded_file($fileTmpPath, $uploadPath)) {
            echo json_encode(['success' => true, 'message' => 'Archivo subido correctamente.', 'filePath' => $uploadPath]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al mover el archivo al directorio de destino.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'La extensión de archivo no está permitida. Solo se permiten archivos ZIP.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No se ha enviado ningún archivo.']);
}
