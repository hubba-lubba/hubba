import { BsTwitch, BsDiscord, BsYoutube, BsTencentQq } from 'react-icons/bs';
import { Button } from '@/components/elements/buttons';

export default function ConnectedApp(props: {
    platform: string;
    username?: string;
}) {
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
        <Button style="mb-4 flex flex-row items-center rounded border-2 p-3 w-[300px]">
            {icon}
            {connect}
        </Button>
    );
}
