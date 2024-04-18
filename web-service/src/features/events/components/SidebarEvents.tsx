import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '@/components/layout';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/contexts/UserProvider';
import { Event } from '../types';
import { useNavigate } from 'react-router-dom';
import { EventsContext } from '@/contexts/EventsProvider';

export const SidebarEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [showMore, setShowMore] = useState<boolean>(false);
    const { userData } = useContext(UserContext);
    const { getMockEvents } = useContext(EventsContext);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            // TODO: API INTEGRATION - query event service for events the user is in
            const events = await getMockEvents(userData.joined_events);
            setEvents(events);
        };

        fetchData();
    }, [userData, getMockEvents]);

    const collapseLength = 3;

    return (
        <SidebarSection
            title="My Events"
            collapsible={events.length > collapseLength}
            showMoreState={[showMore, setShowMore]}
        >
            {events
                .map((event, index) => (
                    <Button
                        key={`sidebar-event-${event.event_id}-${index}`}
                        variant="text"
                        handleClick={() =>
                            navigate(`/events/${event.event_id}`)
                        }
                        // handleClick={() => window.open(event.url)} // make not open in new window when we got proper urls
                    >
                        {event.name}
                    </Button>
                ))
                .slice(0, showMore ? events.length : collapseLength)}
        </SidebarSection>
    );
};
