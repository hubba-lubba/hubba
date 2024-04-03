import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '@/components/layout';
import { useEffect, useState, useContext } from 'react';
import { getFollowingChannels } from '../api';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/contexts/UserProvider';
import { FaRegUserCircle } from 'react-icons/fa';

export const SidebarChannels = () => {
    const [channels, setChannels] = useState<User[]>([]);
    const [showMore, setShowMore] = useState<boolean>(false);
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const channels = await getFollowingChannels(userData);
            setChannels(channels);
        };

        fetchData();
    }, [userData]);

    const collapseLength = 5;

    return (
        <SidebarSection
            title="My Channels"
            collapsible={channels.length > collapseLength}
            showMoreState={[showMore, setShowMore]}
        >
            {channels
                .map((channel, index) => (
                    <Button
                        key={`sidebar-channel-${channel.user_id}-${index}`}
                        variant="image"
                        image={channel.profile_image}
                        Icon={
                            channel.profile_image ? undefined : FaRegUserCircle
                        }
                        handleClick={() => navigate(`/user/${channel.user_id}`)}
                    >
                        {channel.username}
                    </Button>
                ))
                .slice(0, showMore ? channels.length : 5)}
        </SidebarSection>
    );
};
