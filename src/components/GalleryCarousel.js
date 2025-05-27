import React from 'react';
import { Carousel } from 'react-bootstrap';

const GalleryCarousel = () => (
  <Carousel>
    <Carousel.Item>
      <img className="d-block w-100" src="/img/evento1.jpeg" alt="Evento 1" />
      <Carousel.Caption>
        <h3>Festival Cultural</h3>
        <p>Disfruta de la cultura local este fin de semana</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img className="d-block w-100" src="/img/evento2.jpg" alt="Evento 2" />
      <Carousel.Caption>
        <h3>Concierto en el Parque</h3>
        <p>No te pierdas la música en vivo</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

export default GalleryCarousel;
