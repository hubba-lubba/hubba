import { Card, Shelf, Layout } from '@/components/layout';
import { useEffect, useState } from 'react';
import { getUpcomingEvents, getCurrentEvents } from '@/features/events/api';
import { Event } from '@/features/events/types';
import { getLiveUsers } from '@/features/users/api';
import { Live } from '@/features/users/types';

export const Home = () => {
    const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [live, setLive] = useState<Live[]>([]);
    // put this into each feature as a component
    useEffect(() => {
        // once this is complete, move into individual features as a component
        const fetchData = async () => {
            const currentEventsData = await getCurrentEvents();
            setCurrentEvents(currentEventsData.events);

            const upcomingEventsData = await getUpcomingEvents();
            setUpcomingEvents(upcomingEventsData.events);

            const liveData = await getLiveUsers();
            setLive(liveData.live);
        };

        fetchData();
    }, []);

    return (
        <Layout style="w-full flex-col">
            <Shelf title="Current Events" variant="large">
                {currentEvents.map((event, index) => (
                    <Card
                        key={`current-${event.event_id}-${index}`}
                        {...event}
                    ></Card>
                ))}
            </Shelf>
            <Shelf title="Upcoming Events">
                {upcomingEvents.map((event, index) => (
                    <Card
                        key={`upcoming-${event.event_id}-${index}`}
                        {...event}
                    ></Card>
                ))}
            </Shelf>
            <Shelf title="Live">
                {live.map((live, index) => (
                    <Card key={`live-${live.id}-${index}`} {...live}></Card>
                ))}
            </Shelf>
        </Layout>
    );
};
