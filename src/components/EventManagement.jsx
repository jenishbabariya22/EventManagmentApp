import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: '',
  });
  const [rsvpStatus, setRsvpStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to access events');
      navigate('/login');
    } else {
      // Load events from localStorage
      const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
      setEvents(savedEvents);
    }
  }, [navigate]);

  // Handle event creation
  const handleCreateEvent = (e) => {
    e.preventDefault();

    const eventId = events.length + 1;
    const eventWithId = { ...newEvent, id: eventId, attendees: [] };
    const updatedEvents = [...events, eventWithId];

    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setNewEvent({ title: '', description: '', date: '', location: '', maxAttendees: '', image: null });
    toast.success('Event created successfully!');
  };

  // Handle RSVP
  const handleRsvp = (eventId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to RSVP');
      navigate('/login');
      return;
    }

    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        if (event.attendees.length < event.maxAttendees) {
          event.attendees.push('currentUser'); // Replace 'currentUser' with actual user info
          setRsvpStatus({ ...rsvpStatus, [eventId]: true });
          toast.success('RSVP successful');
        } else {
          toast.error('Event is full');
        }
      }
      return event;
    });

    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  // Handle event deletion
  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    toast.info('Event deleted successfully');
  };

  // Handle event editing
  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find((event) => event.id === eventId);
    setNewEvent(eventToEdit);
    handleDeleteEvent(eventId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <ToastContainer autoClose={1000} />
      <h2 className="text-3xl font-bold mb-6">Create a New Event</h2>

      {/* Create Event Form */}
      <form
        onSubmit={handleCreateEvent}
        className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Event Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Max Attendees</label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={newEvent.maxAttendees}
            onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create Event
        </button>
      </form>

      {/* Display List of Events */}
      <h3 className="text-2xl font-bold mt-8 mb-4">Upcoming Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {events.length === 0 ? (
          <p>No upcoming events</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="bg-white p-4 rounded-lg shadow-md">
              <h5 className="text-lg font-bold mb-2">{event.title}</h5>
              <p className="text-sm text-gray-600 mb-4">{event.description}</p>
              <p className="text-sm">
                <strong>Date:</strong> {event.date}
              </p>
              <p className="text-sm">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-sm">
                <strong>Max Attendees:</strong> {event.maxAttendees}
              </p>
              <p className="text-sm">
                <strong>Current Attendees:</strong> {event.attendees.length}
              </p>
              <div className="mt-4">
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded-md mr-2 hover:bg-green-700"
                  onClick={() => handleRsvp(event.id)}
                >
                  {rsvpStatus[event.id] ? 'RSVPed' : 'RSVP'}
                </button>
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded-md mr-2 hover:bg-blue-700"
                  onClick={() => handleEditEvent(event.id)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventManagement;
