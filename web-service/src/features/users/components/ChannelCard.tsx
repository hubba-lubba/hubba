import { Card } from '@/components/library';
import { User } from '../types';
import { TwitchLiveEmbed } from '@/components/external';

export const ChannelCard = ({ user }: { user: User }) => {
    return (
        <Card url={`users/${user.user_id}`}>
            <TwitchLiveEmbed channel={user.channel} />
            <div>
                <img src={user.profile_image} />
                <h2>{user.username}</h2>
            </div>
        </Card>
    );
};
