import { Card } from '@/components/layout';
import { Shelf } from '@/components/layout';
import { useEffect, useState } from 'react';
import { getUpcomingEvents, getCurrentEvents } from '../api';
import { Event } from '../types';
import { getLiveUsers } from '@/features/users/api';
import { Live } from '@/features/users/types';
import { NotFound } from "@/pages/NotFound";

export const EventsFeed = () => {
    const [currentEvents, setCurrentEvents] = useState<Event[]>();
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>();
    const [live, setLive] = useState<Live[]>();
    const [loading, setLoading] = useState<boolean | string>(true);

    useEffect(() => {

        async function fetchData() {
            let currentEventsData;
            let upcomingEventsData;
            let liveData;

            try {
                currentEventsData = await getCurrentEvents();
                upcomingEventsData = await getUpcomingEvents();
                liveData = await getLiveUsers();
            } catch(err) {
                console.log(err)
                setLoading("Error loading page: " + err)
                return
            }

            setCurrentEvents(currentEventsData.events);
            setUpcomingEvents(upcomingEventsData.events);
            setLive(liveData.live);
        }

        fetchData();
        setLoading(false);
    }, []);

    if (typeof loading === "string")
        return <p>{loading}</p>

    if (loading)
        return <p>Loading events...</p>

    if (!currentEvents)
        return <NotFound />

    return (
        <div className="flex h-full w-full flex-col items-start justify-start">
            Events Feed
            <Shelf title="Current Events">
                {currentEvents.map((event, index) => (
                    <Card
                        key={`current-${event.id}-${index}`}
                        variant="large"
                        {...event}
                    ></Card>
                ))}
            </Shelf>
            <Shelf title="Upcoming Events">
                {upcomingEvents!.map((event, index) => (
                    <Card
                        key={`upcoming-${event.id}-${index}`}
                        {...event}
                    ></Card>
                ))}
            </Shelf>
            <Shelf title="Live">
                {live!.map((live, index) => (
                    <Card key={`live-${live.id}-${index}`} {...live}></Card>
                ))}
            </Shelf>
        </div>
    );
};
