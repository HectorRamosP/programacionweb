<?php
require 'conexion.php';

// Validar y sanitizar los datos
$titulo = $conn->real_escape_string($_POST['titulo']);
$fecha = $conn->real_escape_string($_POST['fecha']);
$tipo = $conn->real_escape_string($_POST['tipo']);
$color = $conn->real_escape_string($_POST['color']);
$lugar = $conn->real_escape_string($_POST['lugar']);
$descripcion = $conn->real_escape_string($_POST['descripcion']);

// Procesar imagen
$imagenNombre = '';
if (!empty($_FILES['imagen']['name'])) {
    $targetDir = "uploads/";
    $imagenNombre = basename($_FILES['imagen']['name']);
    $targetFile = $targetDir . uniqid() . '_' . $imagenNombre;
    
    // Mover el archivo subido
    if (move_uploaded_file($_FILES['imagen']['tmp_name'], $targetFile)) {
        $imagenNombre = $targetFile;
    }
}

// Insertar en la base de datos
$sql = "INSERT INTO eventos (title, start, tipo, color, lugar, descripcion, imagen) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $titulo, $fecha, $tipo, $color, $lugar, $descripcion, $imagenNombre);

if ($stmt->execute()) {
    header("Location: index.php?success=1");
} else {
    header("Location: crear-evento.php?error=1");
}

$stmt->close();
$conn->close();
?>