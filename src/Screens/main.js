import React from "react";
import '../main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Main() {
  return (
    <div>
      <header>
        <h1>Bienvenido a mi Página</h1>
      </header>
      <nav>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Acerca de</a></li>
          <li><a href="#">Servicios</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav>
      <div className="container">
        <aside className="sidebar">
          <h3>Menú Lateral</h3>
          <ul>
            <li><a href="#">Opción 1</a></li>
            <li><a href="#">Opción 2</a></li>
            <li><a href="#">Opción 3</a></li>
            <li><a href="#">Opción 4</a></li>
          </ul>
        </aside>
        <main>
          <section>
            <h2>Contenido Principal</h2>
            <p>Este es un ejemplo de página web con una barra lateral y contenido estructurado.</p>
          </section>
          <section>
            <h2>Artículos Destacados</h2>
            <article>
              <h3 className="text-primary">Artículo 1</h3>
              <p>Descripción breve del artículo 1.</p>
            </article>
            <article>
              <h3>Artículo 2</h3>
              <p>Descripción breve del artículo 2.</p>
            </article>
          </section>
        </main>
      </div>
      <footer>
        <p>&copy; 2025 Mi Página. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Main;