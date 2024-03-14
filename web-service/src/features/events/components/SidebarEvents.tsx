import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '@/components/layout';
import { useEffect, useState } from 'react';
import { Event } from '../types';
import { getSidebarEvents } from '../api';

export const SidebarEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const events = await getSidebarEvents();
            setEvents(events.current_events);
        };

        fetchData();
    }, []);
    return (
        <SidebarSection title="My Events">
            {events.map((event, index) => (
                <Button
                    key={`sidebar-event-${event.id}-${index}`}
                    variant="text"
                    handleClick={() => window.open(event.url)} // make not open in new window when we got proper urls
                >
                    {event.title}
                </Button>
            ))}
        </SidebarSection>
    );
};
