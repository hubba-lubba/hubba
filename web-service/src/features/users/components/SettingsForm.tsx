import { useContext } from 'react';
import { UpdateUserInfoForm } from './UpdateUserInfoForm'
import { AuthContext } from '@/contexts/AuthProvider';
import { Layout } from '@/components/layout';
import { BsTwitch, BsDiscord, BsYoutube, BsTencentQq } from 'react-icons/bs';

function ConnectedApp(props: { platform: string; username?: string }) {
    const { platform, username } = props;

    let icon;
    switch (platform) {
        case 'Twitch':
            icon = <BsTwitch size={32} className="mr-4" />;
            break;
        case 'Discord':
            icon = <BsDiscord size={32} className="mr-4" />;
            break;
        case 'Youtube':
            icon = <BsYoutube size={32} className="mr-4" />;
            break;
        default:
            icon = <BsTencentQq size={32} className="mr-4" />;
    }

    let connect;
    if (username) connect = <p>{username}</p>;
    else connect = <p>Connect your {platform} account</p>;

    return (
        <div className="mb-4 flex w-[300px] cursor-pointer flex-row items-center rounded border-2 p-3">
            {icon}
            {connect}
        </div>
    );
}

type userSettings = {
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
        <Layout style="flex-col items-center">
            <h1 className="mb-8 text-5xl font-bold">Settings</h1>
            <UpdateUserInfoForm />
            <section className="mb-6">
                <h2 className="mb-2 text-2xl">Connected Apps</h2>
                {connections}
            </section>
        </Layout>
    );
};
