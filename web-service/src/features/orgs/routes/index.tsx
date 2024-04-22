import { Routes, Route } from 'react-router-dom';
import { OrgPage } from '../components/OrgPage';
import { OrgsFeed } from '../components/OrgsFeed';
import { OrgSettingsForm } from '../components/OrgSettingsForm';
import { NotFound } from '@/pages/NotFound';

export const OrgRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<OrgsFeed />} />
            <Route path="/:id" element={<OrgPage />} />
            <Route path="/:id/settings" element={<OrgSettingsForm />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
