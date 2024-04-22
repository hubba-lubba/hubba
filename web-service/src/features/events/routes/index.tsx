import { Routes, Route } from 'react-router-dom';
import { EventPage } from '../components/EventPage';
import { EventsFeed } from '../components/EventsFeed';
import { EventSettingsForm } from '../components/EventSettingsForm';
import { NotFound } from '@/pages/NotFound';

export const EventRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<EventsFeed />} />
            <Route path="/:id" element={<EventPage />} />
            <Route path="/:id/settings" element={<EventSettingsForm />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
