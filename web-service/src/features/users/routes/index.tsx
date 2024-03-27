import { Routes, Route } from 'react-router-dom';
import { EditProfileForm } from '../components/EditProfileForm';
import { Inbox } from '../components/Inbox';
import { Profile } from '../components/Profile';
import { SettingsForm } from '../components/SettingsForm';

export const UserProtectedRoutes = () => {
    console.log('protected');
    return (
        <Routes>
            <Route path="update" element={<EditProfileForm />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="settings" element={<SettingsForm />} />
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
