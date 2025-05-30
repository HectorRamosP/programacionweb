<?php
require 'conexion.php';

// Consulta para obtener los eventos
$sql = "SELECT id, title, start, color, imagen, descripcion FROM eventos";
$resultado = $conn->query($sql);
$eventos = [];

if ($resultado->num_rows > 0) {
    while($fila = $resultado->fetch_assoc()) {
        $eventos[] = $fila;
    }
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EventosHMO</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background-color: #f8f9fa;
    }
    .card {
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .navbar-brand {
      font-weight: bold;
      font-size: 1.3rem;
    }
    .card-title {
      font-weight: 600;
    }
    .event-card {
      border-left: 5px solid;
    }
    .card-img-top {
      height: 200px;
      object-fit: cover;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }
    .card-body {
      flex-grow: 1;
    }
    .modal-body img {
      max-height: 400px;
      width: 100%;
      object-fit: contain;
      border-radius: 0.5rem;
    }
  </style>
</head>
<body>
  <!-- Navbar -->
  <nav class="navbar navbar-dark bg-dark px-4">
    <span class="navbar-brand">EventosHMO</span>
    <div class="navbar-nav flex-row gap-3">
      <a class="nav-link text-white" href="#">Inicio</a>
      <a class="nav-link text-white" href="#">Eventos</a>
      <a class="nav-link text-white" href="#">Contacto</a>
      <a class="nav-link text-white" href="crearEvento.html">Crear evento</a>
    </div>
  </nav>

  <!-- Contenido principal -->
  <div class="container text-center mt-5">
    <h2>Explora eventos en Hermosillo</h2>

    <!-- Filtros -->
    <div class="row my-4">
      <div class="col-md-4">
        <input type="text" class="form-control" placeholder="Buscar por lugar" id="buscarLugar">
      </div>
      <div class="col-md-4">
        <input type="date" class="form-control" id="filtroFecha">
      </div>
      <div class="col-md-4">
        <select class="form-select" id="filtroTipo">
          <option value="" selected>Todos los tipos</option>
          <option value="Concierto">Concierto</option>
          <option value="Festival">Festival</option>
          <option value="Exposición">Exposición</option>
          <option value="Deportivo">Evento Deportivo</option>
          <option value="Cultural">Evento Cultural</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
    </div>

    <!-- Tarjetas de eventos -->
    <div class="row row-cols-1 row-cols-md-3 g-4" id="contenedorEventos">
      <?php if (count($eventos) > 0): ?>
        <?php foreach ($eventos as $evento): ?>
          <div class="col">
            <div class="card event-card" style="border-left-color: <?php echo $evento['color'] ?: '#007bff'; ?>">
              <img src="<?php echo htmlspecialchars($evento['imagen']); ?>" class="card-img-top" alt="Imagen del Evento">
              <div class="card-body">
                <h5 class="card-title"><?php echo htmlspecialchars($evento['title']); ?></h5>
                <p class="card-text"><?php echo (new DateTime($evento['start']))->format('Y-m-d'); ?></p>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal<?php echo $evento['id']; ?>">Ver detalles</button>
                <button class="btn btn-success asistir-btn" data-id="<?php echo $evento['id']; ?>">Asistir (0)</button>
              </div>
            </div>
          </div>

          <!-- Modal -->
          <div class="modal fade" id="modal<?php echo $evento['id']; ?>" tabindex="-1" aria-labelledby="modalLabel<?php echo $evento['id']; ?>" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="modalLabel<?php echo $evento['id']; ?>"><?php echo htmlspecialchars($evento['title']); ?></h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                  <img src="<?php echo htmlspecialchars($evento['imagen']); ?>" class="img-fluid mb-3" alt="Imagen del Evento">
                  <p><strong>Fecha:</strong> <?php echo (new DateTime($evento['start']))->format('d/m/Y'); ?></p>
                  <p><strong>Descripción:</strong> <?php echo nl2br(htmlspecialchars($evento['descripcion'])); ?></p>
                </div>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      <?php else: ?>
        <div class="col-12">
          <div class="alert alert-info">No hay eventos disponibles en este momento.</div>
        </div>
      <?php endif; ?>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    // Función para filtrar eventos
    function filtrarEventos() {
      const lugar = document.getElementById('buscarLugar').value.toLowerCase();
      const fecha = document.getElementById('filtroFecha').value;
      const tipo = document.getElementById('filtroTipo').value.toLowerCase();
      
      const cards = document.querySelectorAll('#contenedorEventos .col');
      
      cards.forEach(card => {
        const titulo = card.querySelector('.card-title').textContent.toLowerCase();
        const fechaEvento = card.querySelector('.card-text').textContent;
        const mostrar = 
          (lugar === '' || titulo.includes(lugar)) &&
          (fecha === '' || fechaEvento.includes(fecha)) &&
          (tipo === '' || titulo.includes(tipo));
        
        card.style.display = mostrar ? 'block' : 'none';
      });
    }

    // Event listeners para filtros
    document.getElementById('buscarLugar').addEventListener('input', filtrarEventos);
    document.getElementById('filtroFecha').addEventListener('change', filtrarEventos);
    document.getElementById('filtroTipo').addEventListener('input', filtrarEventos);

    // Botones de Asistir
    document.querySelectorAll('.asistir-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const currentText = this.textContent;
        const match = currentText.match(/\((\d+)\)/);
        let count = match ? parseInt(match[1]) + 1 : 1;
        this.textContent = `Asistir (${count})`;
      });
    });
  </script>
</body>
</html>
