<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

try{
    // Directorio de destino para almacenar las imágenes
    $uploadDirectory = '../src/assets/uploads/profiles/';

    // Verifica si se ha enviado una imagen
    if ($_FILES['image']) {
        $errors = [];
        $fileTmpPath = $_FILES['image']['tmp_name'];
        $fileName = $_FILES['image']['name'];
        $fileSize = $_FILES['image']['size'];
        $fileType = $_FILES['image']['type'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        // Obtener el valor de "name" enviado desde Angular
        $name = $_POST['name'];

        // Lista de extensiones de archivo permitidas
        $allowedExtensions = ["jpg", "jpeg", "png", "gif"];

        // Verifica si la extensión del archivo es válida
        if (in_array($fileExtension, $allowedExtensions)) {
            // Genera un nombre único para el archivo
            $newFileName = $name . '.' . $fileExtension;
            $uploadPath = $uploadDirectory . $newFileName;

            // Mueve el archivo al directorio de destino
            if (move_uploaded_file($fileTmpPath, $uploadPath)) {
                echo json_encode(['success' => true, 'message' => 'Archivo subido correctamente.', 'filePath' => $uploadPath]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error al mover el archivo al directorio de destino.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'La extensión de archivo no está permitida. Solo se permiten archivos JPG, JPEG, PNG y GIF.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No se ha enviado ninguna imagen.']);
    }
}catch(Exception $e){
    echo json_encode(["error" => $e]);
}