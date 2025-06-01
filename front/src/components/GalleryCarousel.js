import { useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";

const GalleryCarousel = () => {
 const eventos = useSelector((state) => state.eventos?.eventos || []);
  const destacados = eventos.slice(0, 3);

  return (
    <Carousel>
      {destacados.map((evento) => (
        <Carousel.Item key={evento.id}>
          <img className="d-block w-100" src={evento.imagen} alt={evento.titulo} />
          <Carousel.Caption>
            <h3>{evento.titulo}</h3>
            <p>{evento.descripcion}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default GalleryCarousel;