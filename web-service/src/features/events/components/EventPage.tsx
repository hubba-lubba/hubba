import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getUpcomingEvents, getCurrentEvents } from '../api';
import { Event } from '../types';
import { NotFound } from "@/pages/NotFound";
import { Link } from "react-router-dom";

async function fetchEventData(id: string) {

    const currentEvents = await getCurrentEvents();
    const upcomingEvents = await getUpcomingEvents();

    for (const event of currentEvents.events)
        if (event.id === id)
            return { event: event, live: true };
    for (const event of upcomingEvents.events)
        if (event.id === id)
            return { event: event, live: false };

    throw new Error("Event not found");
}


export const EventPage = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event>();
    const [currentEvent, setCurrentEvent] = useState<boolean>();

    useEffect(() => {
        fetchEventData(id!)
            .then((res) => {
                setEvent(res.event)
                setCurrentEvent(res.live)
            })
            .catch((err) => console.log(err))
    }, [id]);

    if (!event) {
        return <NotFound/>
    }

    // in the future store time_of_event as a Date object
    if (!event.time_of_event)
        console.log('no time');
    const timeFormat = {
        dateStyle: 'long',
        timeStyle: 'medium',
        timeZone: 'America/New_York'
    }
    const time = new Intl.DateTimeFormat('en-US', timeFormat).format(new Date());

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
                <p>Time: {time}</p>
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
