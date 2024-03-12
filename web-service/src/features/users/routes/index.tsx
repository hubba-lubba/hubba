import { Routes, Route } from 'react-router-dom';
import { Settings } from './Settings';
import { Profile } from '../components/Profile';

export const UserRoutes = () => {
    return (
        <Routes>
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
        </Routes>
    );
};
