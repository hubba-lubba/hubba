import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '@/components/layout';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/contexts/UserProvider';
import { Pfp } from '@/components/elements';

export const SidebarChannels = () => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const { userChannels } = useContext(UserContext);
    const navigate = useNavigate();

    const collapseLength = 5;

    return (
        <SidebarSection
            title="My Channels"
            collapsible={userChannels.length > collapseLength}
            showMoreState={[showMore, setShowMore]}
        >
            {userChannels
                .map((channel, index) => (
                    <Button
                        key={`sidebar-channel-${channel.user_id}-${index}`}
                        variant="image"
                        icon={<Pfp image={channel?.profile_image} size={32} />}
                        handleClick={() => navigate(`/user/${channel.user_id}`)}
                    >
                        {channel.username}
                    </Button>
                ))
                .slice(0, showMore ? userChannels.length : 5)}
        </SidebarSection>
    );
};
