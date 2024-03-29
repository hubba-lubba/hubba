import { Card, Grid, Layout } from '@/components/layout';
import { useEffect, useState } from 'react';
import { getUpcomingEvents } from '@/features/events/api';
import { Event } from '@/features/events/types';

export const OrgsFeed = () => {
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

    // put this into each feature as a component
    useEffect(() => {
        // once this is complete, move into individual features as a component
        const fetchData = async () => {
            const upcomingEventsData = await getUpcomingEvents();
            setUpcomingEvents(upcomingEventsData.events);
        };

        fetchData();
    }, []);
    return (
        <Layout style="w-full flex-col">
            <Grid title="Upcoming Events">
                {upcomingEvents!.map((event, index) => (
                    <Card
                        key={`upcoming-${event.id}-${index}`}
                        {...event}
                    ></Card>
                ))}
            </Grid>
        </Layout>
    );
};
