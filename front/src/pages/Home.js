import NavigationBar from '../components/NavigationBar';
import GalleryCarousel from '../components/GalleryCarousel';
import Filters from '../components/Filters';
import EventList from '../components/EventList';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      <NavigationBar />
      <div style={{ paddingTop: "80px" }}>
        <GalleryCarousel />
        <Container className="section-padding">
          <div className="text-center mb-modern">
            <h1 className="gradient-text mb-3">Descubre Eventos Increíbles</h1>
            <p className="lead text-muted fs-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
              Explora los mejores eventos en Hermosillo. Desde conciertos hasta festivales culturales, encuentra tu
              próxima experiencia inolvidable.
            </p>
          </div>
          <Filters />
          <EventList />
        </Container>
      </div>
    </>
  );
};

export default Home;