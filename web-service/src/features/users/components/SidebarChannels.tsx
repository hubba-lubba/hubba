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
            console.log(channels);
            setChannels(channels);
        };

        fetchData();
    }, [userData]);

    function toggleShowMore() {
        setShowMore(prevState => !prevState);
    }

    return (
        <SidebarSection title="My Channels">
            {channels.map((channel, index) => (
                <Button
                    key={`sidebar-channel-${channel.id}-${index}`}
                    variant="image"
                    image={channel.profile_image}
                    Icon={channel.profile_image ? undefined : FaRegUserCircle}
                    handleClick={() => navigate(`/user/${channel.id}`)}
                >
                    {channel.username}
                </Button>
            )).slice(0, showMore ? 5 : 3)}
            <Button variant="text" handleClick={toggleShowMore}>
                <small className="mt-2 uppercase text-hubba-600">
                    {showMore ? "Hide" : "Show more"}
                </small>
            </Button>
        </SidebarSection>
    );
};
