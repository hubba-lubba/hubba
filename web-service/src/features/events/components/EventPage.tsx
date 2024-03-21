import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getUpcomingEvents, getCurrentEvents } from '../api';
import { Event } from '../types';
import { NotFound } from "@/pages/NotFound";
import { Link } from "react-router-dom";


export const EventPage = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event>();
    const [currentEvent, setCurrentEvent] = useState<boolean>();
    const [loading, setLoading] = useState<boolean | string>(true);

    useEffect(() => {
        async function fetchEventData(id: string) {

            const currentEvents = await getCurrentEvents();
            const upcomingEvents = await getUpcomingEvents();

            for (const event of currentEvents.events) {
                if (event.id === id) {
                    setEvent(event)
                    setCurrentEvent(true)
                }
            }
            for (const event of upcomingEvents.events) {
                if (event.id === id) {
                    setEvent(event)
                    setCurrentEvent(false)
                }
            }

            setLoading(false);
            throw new Error("Event not found");
        }

        fetchEventData(id!)
            .catch(err => setLoading("Error loading page: " + err))
    }, [id]);

    if (typeof loading === "string") //error
        return <p>{loading}</p>

    if (!event) {
        return <NotFound/>
    }

    if (loading)
        return <p>Loading events...</p>

    // in the future store time_of_event as a Date object
    if (!event.time_of_event)
        console.log('no time');

    type timeFormat = {
        dateStyle: "long",
        timeStyle: "medium",
        timeZone: string,
    } //middle finger typescript
    const timeFormat: timeFormat = {
        dateStyle: "long",
        timeStyle: "medium",
        timeZone: "America/New_York"
    }
    const time = new Intl.DateTimeFormat('en-US', timeFormat).format(new Date());

    const tags = []
    for (let i = 0; i < event.tags.length; i++)
        tags.push(<p key={i} className="">{event.tags[i]}</p>)

    return (
        <div>
            <Link to={event.url}><img src={event.thumbnail || "/public/image_not_found.jpg"}/></Link>
            <div>
                <h1>{event.title || `Event ${event.id}`}</h1>
                {tags}
                <p>{event.viewer_count} views</p>
                <p>Time: {time}</p>
                <p>Host: {event.host}</p>
                <p>Status: {currentEvent ? "Live" : "Upcoming"}</p>
                <p>Entry Fee: ${event.entryfee}</p>
                {/* button should do something idk */}
                <button>ENTER</button>
            </div>
            <div>
                <h2>DETAILS</h2>
                <p>{event.description || <></>}</p>
            </div>
            <div>
            <h2>PRIZES</h2>
                {event.prizes?.[0] ? `First Place: ${event.prizes?.[0]}` : <></>}
                <br/>
                {event.prizes?.[1] ? `Second Place: ${event.prizes?.[1]}` : <></>}
                <br/>
                {event.prizes?.[2] ? `Third Place: ${event.prizes?.[2]}` : <></>}
            </div>
        </div>
    );
}
