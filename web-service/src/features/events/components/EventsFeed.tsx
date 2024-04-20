import { Layout } from '@/components/layout';
import { Shelf, Grid } from '@/components/library';
import { EventCard } from './EventCard';
import { useEffect, useState } from 'react';
import { Event } from '../types';
import {
    get_current_events,
    // get_random_events,
    get_upcoming_events,
} from '../api';

export const EventsFeed = () => {
    const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [discoverEvents, setDiscoverEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean | string>(true);

    useEffect(() => {
        async function fetchData() {
            const currentEventsData = await get_current_events();
            const upcomingEventsData = await get_upcoming_events();
            // TODO: fix this after deploying server changes (remove ensure authorized from get_random_events)
            const discoverEventsData = await get_upcoming_events();
            // const discoverEventsData = await get_random_events();

            setCurrentEvents(currentEventsData);
            setUpcomingEvents(upcomingEventsData);
            setDiscoverEvents(discoverEventsData);
        }

        fetchData();
        setLoading(false);
    }, []);

    if (typeof loading === 'string')
        //error
        return <p>{loading}</p>;

    if (loading) return <p>Loading events...</p>;

    if (!currentEvents) return <p>No Events Found</p>;

    return (
        <Layout style="w-full flex-col">
            <Shelf title="Current Events" variant="large">
                {currentEvents.map((event, index) => (
                    <EventCard
                        key={`current-${event.event_id}-${index}`}
                        event={event}
                    ></EventCard>
                ))}
            </Shelf>
            {/* can render shelves by category later. for now just grid */}
            <Grid title="Upcoming Events">
                {upcomingEvents.map((event, index) => (
                    <EventCard
                        key={`upcoming-${event.event_id}-${index}`}
                        event={event}
                    ></EventCard>
                ))}
            </Grid>
            <Grid title="Discover">
                {discoverEvents.map((event, index) => (
                    <EventCard
                        key={`discover-${event.event_id}-${index}`}
                        event={event}
                    ></EventCard>
                ))}
            </Grid>
        </Layout>
    );
};
