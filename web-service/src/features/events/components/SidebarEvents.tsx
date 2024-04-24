import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '@/components/layout';
import { useState, useContext } from 'react';
import { UserContext } from '@/contexts/UserProvider';
import { useNavigate } from 'react-router-dom';
import { Pfp } from '@/components/elements';

export const SidebarEvents = () => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const { userEvents } = useContext(UserContext);
    const navigate = useNavigate();

    const collapseLength = 3;

    return (
        <SidebarSection
            title="My Events"
            collapsible={userEvents?.length > collapseLength}
            showMoreState={[showMore, setShowMore]}
        >
            {userEvents
                ?.map((event, index) => (
                    <Button
                        key={`sidebar-event-${event.event_id}-${index}`}
                        variant="text"
                        icon={<Pfp image={event.thumbnail} variant="event" />}
                        handleClick={() =>
                            navigate(`/events/${event.event_id}`)
                        }
                        // handleClick={() => window.open(event.url)} // make not open in new window when we got proper urls
                    >
                        {event.name}
                    </Button>
                ))
                .slice(0, showMore ? userEvents?.length : collapseLength)}
        </SidebarSection>
    );
};
