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
    const pad = (n: number) => {
        return n<10 ? '0'+n : n;
    }
    let string = event?.time_of_event;
    if (!string) console.log('no time');
    let time = new Date(Date.parse(string));

    return (
        <div>
            <Link to={event?.url}><img src={event.thumbnail || "/public/image_not_found.jpg"}/></Link>
            <div>
                <h1>{event.title || `Event ${event.id}`}</h1>

                {event?.tags.map((tag) => {
                    return (
                        // please make these tags oval shaped and in a line and different colored if you know what i mean
                        <p>{tag}</p>
                    )
                })}
                <p>{event?.viewer_count} views</p>
                <p>Time: {time.toDateString()} {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}</p>
                <p>Host: {event?.host}</p>
                <p>Status: {currentEvent ? "Live" : "Upcoming"}</p>
                <p>Entry Fee: ${event?.entryfee}</p>
                {/* button should do something idk */}
                <button>ENTER</button>
            </div>
            <div>
                <h2>DETAILS</h2>
                <p>{event.description || <></>}</p>
            </div>
            <div>
            <h2>PRIZES</h2>
                {event?.prizes?.[0] ? `First Place: ${event?.prizes?.[0]}` : <></>}
                <br/>
                {event?.prizes?.[1] ? `Second Place: ${event?.prizes?.[1]}` : <></>}
                <br/>
                {event?.prizes?.[2] ? `Third Place: ${event?.prizes?.[2]}` : <></>}
            </div>
        </div>
    );
}
