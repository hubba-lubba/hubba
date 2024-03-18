import { Routes, Route } from 'react-router-dom';
import { Edit } from './Edit';
import { Message } from './Message';
import { Inbox } from './Inbox';
import { Settings } from './Settings';
import { Profile } from '../components/Profile';

export const UserProtectedRoutes = () => {
    console.log('protected');
    return (
        <Routes>
            <Route path="edit" element={<Edit />} />
            <Route path="message" element={<Message />} />
            <Route path="inbox" element={<Inbox />} />
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
