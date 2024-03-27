import { useContext } from 'react';
import ConnectedApp from './ConnectedApp';
import ChangePassword from './ChangePassword';
import { AuthContext } from '@/contexts/AuthProvider';

type userSettings = {
    notifications?: boolean;
    connections?: { platform: string; username?: string }[];
};

export const SettingsForm = () => {
    const user = useContext(AuthContext) as userSettings;

    const SAMPLE_CONNECTIONS = [
        { platform: 'Twitch' },
        { platform: 'Youtube' },
        { platform: 'Discord' },
    ];
    user.connections ||= SAMPLE_CONNECTIONS;

    const connections = [];
    for (let i = 0; i < user.connections.length; i++)
        connections.push(<ConnectedApp {...user.connections[i]} key={i} />);

    return (
        <div className="flex flex-col items-center">
            <h1 className="mb-8 text-5xl font-bold">Settings</h1>
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
