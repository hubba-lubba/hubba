import { Layout } from '@/components/layout';
import { Shelf, Grid } from '@/components/library';
import { EventCard } from './EventCard';
import { useContext, useEffect, useState } from 'react';
import { Event } from '../types';
import { EventsContext } from '@/contexts/EventsProvider';

export const EventsFeed = () => {
    const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [discoverEvents, setDiscoverEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean | string>(true);
    const { getCurrentEvents, getUpcomingEvents, getDiscoverEvents } =
        useContext(EventsContext);

    useEffect(() => {
        async function fetchData() {
            let currentEventsData;
            let upcomingEventsData;
            let discoverEventsData;

            try {
                currentEventsData = await getCurrentEvents();
                upcomingEventsData = await getUpcomingEvents();
                discoverEventsData = await getDiscoverEvents();
            } catch (err) {
                console.log(err);
                setLoading('Error loading page: ' + err);
                return;
            }

            setCurrentEvents(currentEventsData.events);
            setUpcomingEvents(upcomingEventsData.events);
            setDiscoverEvents(discoverEventsData.events);
        }

        fetchData();
        setLoading(false);
    }, [getCurrentEvents, getUpcomingEvents, getDiscoverEvents]);

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
