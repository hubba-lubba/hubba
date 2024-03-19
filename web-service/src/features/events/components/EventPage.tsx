import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getUpcomingEvents, getCurrentEvents } from '@/features/events/api';
import { Event } from '@/features/events/types';
import { NotFound } from "@/pages/NotFound";
import { Link } from "react-router-dom";

export const EventPage = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event>();
    const [currentEvent, setCurrentEvent] = useState(true);
    useEffect(() => {
        (async () => {
        // once this is complete, move into individual features as a component
        const currentEventsData = await getCurrentEvents();
        const upcomingEventsData = await getUpcomingEvents();
        let event = [...currentEventsData.current_events, ...upcomingEventsData.upcoming_events].filter(obj => obj.id===id);
        setEvent(event[0]);
        if (event && upcomingEventsData.upcoming_events.includes(event[0])){
            setCurrentEvent(false);
        }
        })();
    }, []);

    if (!event){
        return (
            <div>
                <NotFound/>
            </div>
        )
    } 

    return (
        <div>
            <h1>{!!event.title ? event.title : `Event ${event.id}`}</h1>
            <Link to={event?.url}><img src={!!event.thumbnail ? event.thumbnail : "/public/image_not_found.jpg"}/></Link>
            <p>{!!event.description ? event.description : <></>}</p>
            {event?.tags.map((tag) => {
                return (
                    // please make these tags oval shaped and different colored if you know what i mean 
                    <text>{tag}</text>
                )
            })}
            <p>{event?.viewer_count} views</p>
            <p>Status: {currentEvent ? "Ongoing" : "Upcoming"}</p>
        </div>
    );
}