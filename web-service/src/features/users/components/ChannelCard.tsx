import { Card } from '@/components/library';
import { User } from '../types';
import { TwitchLiveEmbed } from '@/components/external';
import { Pfp } from '@/components/elements';
import { statuses } from '@/lib/constants';

export const ChannelCard = ({ user }: { user: User }) => {
    return (
        <Card
            url={`users/${user.user_id}`}
            media={<TwitchLiveEmbed channel={user.channel} />}
            footer={
                <>
                    <div className="flex w-1/2 flex-row items-center">
                        <Pfp image={user.profile_image} />
                        <div>{user.username}</div>
                    </div>
                    <div className="flex w-1/2 flex-col items-end">
                        <div>{statuses[user.streaming_status]}</div>
                    </div>
                </>
            }
        />
    );
};
