import { Routes, Route } from 'react-router-dom';
import { EventPage } from '../components/EventPage';
import { EventsFeed } from '../components/EventsFeed';

export const EventRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<EventsFeed />} />
            <Route path="/:id" element={<EventPage />} />
        </Routes>
    );
};
