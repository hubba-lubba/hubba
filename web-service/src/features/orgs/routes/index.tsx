import { Routes, Route } from 'react-router-dom';
import { OrgPage } from '../components/OrgPage';
import { OrgsFeed } from '../components/OrgsFeed';

export const OrgRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<OrgsFeed />} />
            <Route path="/:id" element={<OrgPage />} />
        </Routes>
    );
};
