import { Card } from '@/components/library';
import { User } from '../types';
import { TwitchLiveEmbed } from '@/components/external';
import { Pfp } from '@/components/elements';
import { statuses } from '@/lib/constants';
import { AuthContext } from '@/contexts/AuthProvider';
import { useContext } from 'react';

export const ChannelCard = ({ user }: { user: User }) => {
    const currentUser = useContext(AuthContext);
    
    return (
        <Card
            url={`/user/${user.user_id}`}
            media={<TwitchLiveEmbed channel={user.channel} />}
            footer={
                <>
                    <div className="flex w-11/12 flex-row items-center">
                        <Pfp image={user.profile_image} />
                        <div className='ml-2.5 truncate'>{currentUser.displayName}</div>
                    </div>
                    <div className="flex w-1/12 flex-col items-end">
                        <div>{statuses[user.streaming_status]}</div>
                    </div>
                </>
            }
        />
    );
};
