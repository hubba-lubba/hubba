import { useContext } from 'react';
import ConnectedApp from './ConnectedApp';
import ChangePassword from './ChangePassword';
import { AuthContext } from '@/contexts/AuthProvider';

type userSettings = {
    notifications?: boolean;
    connections?: { platform: string; username?: string }[];
};

export function SettingsForm() {
    const user = useContext(AuthContext) as userSettings;

    // function handleNotifications() {
    //     //update user notifs (somehow)
    //     //setUser(prevUser => ({
    //     //  ...prevUser,
    //     //  notifications: !prevUser.notifications
    //     //}))
    //     user.notifications = !user.notifications;
    // }

    const SAMPLE_CONNECTIONS = [
        { platform: 'Twitch' },
        { platform: 'Youtube' },
        { platform: 'Discord' },
        // { platform: 'Spotify' },
        // { platform: 'X' },
        // { platform: 'LINUX' },
    ];
    user.connections ||= SAMPLE_CONNECTIONS;

    const connections = [];
    for (let i = 0; i < user.connections.length; i++)
        connections.push(<ConnectedApp {...user.connections[i]} key={i} />);

    return (
        <div className="flex flex-col items-start">
            <h1 className="mb-8 text-5xl font-bold">Settings</h1>
            {/* <section className="flex flex-row gap-2 mb-6">
                <label
                    htmlFor="notifications"
                    className="text-xl">
                    Notifications
                </label>
                <input
                    type="checkbox"
                    id="notifications"
                    name="notifications"
                    checked={user.notifications}
                    onChange={handleNotifications} />
            </section> */}
            <section className="mb-6">
                <h2 className="mb-2 text-3xl">Connected Apps</h2>
                {connections}
            </section>
            <section className="mb-6">
                <h2 className="mb-2 text-3xl">Change Password</h2>
                <ChangePassword />
            </section>
        </div>
    );
}
