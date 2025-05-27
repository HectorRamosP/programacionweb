import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../redux/eventsSlice';
import EventCard from './EventCard';

const EventList = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector(state => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <p>Cargando eventos...</p>;

  return (
    <div className="row">
      {events.map(event => (
        <div className="col-md-4 mb-4" key={event.id}>
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
};

export default EventList;
