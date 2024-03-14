import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '@/components/layout';
import { useEffect, useState } from 'react';
import { getFollowingChannels } from '../api';
import { User } from '../types';

export const SidebarChannels = () => {
    const [channels, setChannels] = useState<User[]>([]);

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
                    handleClick={() => window.open(channel.channel_url)}
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
