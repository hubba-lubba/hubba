import { Card } from '@/components/layout';
import { Shelf } from '@/components/layout';
import { useEffect, useState } from 'react';
import { getUpcomingEvents, getCurrentEvents } from '@/features/events/api';
import { Event } from '@/features/events/types';
import { getLiveUsers } from '@/features/users/api';
import { Live } from '@/features/users/types';
import { useWindowDimensions } from '@/utils/hooks';

export const Home = () => {
    const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const { width } = useWindowDimensions();
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

    useEffect(() => {
        console.log('width', width);
        // 1 card per 600px
        // 2 cards per 300px (smaller shelves)
        // try making shelves generic and putting this in Shelf.tsx
    }, [width]);
    return (
        <div className="scroll-gutter flex h-full w-full flex-col items-start justify-start overflow-y-auto">
            {/* Current Events */}
            {/* Upcoming Events */}
            {/* Live */}
            <Shelf title="Current Events">
                {currentEvents.map((event, index) => (
                    <Card
                        key={`current-${event.id}-${index}`}
                        variant="full"
                        {...event}
                    ></Card>
                ))}
            </Shelf>
            <Shelf title="Upcoming Events">
                {upcomingEvents.map((event, index) => (
                    <Card
                        key={`upcoming-${event.id}-${index}`}
                        {...event}
                    ></Card>
                ))}
            </Shelf>
            <Shelf title="Live">
                {live.map((live, index) => (
                    <Card key={`live-${live.id}-${index}`} {...live}></Card>
                ))}
            </Shelf>
        </div>
    );
};
