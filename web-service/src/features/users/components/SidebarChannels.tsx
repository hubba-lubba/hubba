import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '@/components/layout';
import { useEffect, useState } from 'react';
import { getFollowingChannels } from '../api';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';

export const SidebarChannels = () => {
    const [channels, setChannels] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const channels = await getFollowingChannels();
            setChannels(channels.following);
        };

        fetchData();
    }, []);

    return (
        <SidebarSection title="My Channels">
            {channels.map((channel, index) => (
                <Button
                    key={`sidebar-channel-${channel.id}-${index}`}
                    variant="image"
                    image={channel.profile_image}
                    handleClick={() => navigate(`/user/${channel.id}`)} // TBD: link to twitch or our own user page? if twitch our user page becomes obsolete so i'm thinking our own which contains link to twitch, and instead livestream cards link to their platforms.
                    // handleClick={() => window.open(channel.channel_url)}
                >
                    {channel.username}
                </Button>
            ))}
            <Button variant="text">
                <small className="mt-2 uppercase text-hubba-600">
                    Show more
                </small>
            </Button>
        </SidebarSection>
    );
};
