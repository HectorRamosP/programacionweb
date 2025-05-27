import React from 'react';
import NavigationBar from '../components/NavigationBar';
import GalleryCarousel from '../components/GalleryCarousel';
import Filters from '../components/Filters';
import EventList from '../components/EventList';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      <NavigationBar />
      <GalleryCarousel />
      <Container className="mt-4">
        <h2 className="mb-4">Explora eventos en Hermosillo</h2>
        <Filters />
        <EventList />
      </Container>
    </>
  );
};

export default Home;
