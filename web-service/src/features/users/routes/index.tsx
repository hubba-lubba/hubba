import { Routes, Route } from 'react-router-dom';
import { Settings } from './Settings';
import { Profile } from '../components/Profile';

export const UserProtectedRoutes = () => {
    console.log('protected');
    return (
        <Routes>
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
        </Routes>
    );
};

export const UserCommonRoutes = () => {
    console.log('common routes');
    return (
        <Routes>
            <Route path=":id" element={<Profile />} />
        </Routes>
    );
};
