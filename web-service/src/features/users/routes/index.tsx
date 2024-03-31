import { Routes, Route } from 'react-router-dom';
import { EditProfileForm } from '../components/EditProfileForm';
import { Inbox } from '../components/Inbox';
import { Profile } from '../components/Profile';
import { SettingsForm } from '../components/SettingsForm';
import { NotFound } from '@/pages/NotFound';

export const UserProtectedRoutes = () => {
    return (
        <Routes>
            <Route path="edit" element={<EditProfileForm />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="settings" element={<SettingsForm />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export const UserCommonRoutes = () => {
    return (
        <Routes>
            <Route path=":id" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
