import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '@/components/layout';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/contexts/UserProvider';
import { Event } from '../types';
import { getSidebarEvents } from '../api';
import { useNavigate } from 'react-router-dom';

export const SidebarEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const events = await getSidebarEvents(userData);
            setEvents(events);
        };

        fetchData();
    }, [userData]);
    return (
        <SidebarSection title="My Events">
            {events.map((event, index) => (
                <Button
                    key={`sidebar-event-${event.id}-${index}`}
                    variant="text"
                    handleClick={() => navigate(`/events/${event.id}`)}
                    // handleClick={() => window.open(event.url)} // make not open in new window when we got proper urls
                >
                    {event.title}
                </Button>
            ))}
        </SidebarSection>
    );
};
