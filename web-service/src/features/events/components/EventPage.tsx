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
            setLoading(false);

            for (const event of currentEvents.events) {
                if (event.id === id) {
                    setEvent(event)
                    setCurrentEvent(true)
                    return;
                }
            }
            for (const event of upcomingEvents.events) {
                if (event.id === id) {
                    setEvent(event)
                    setCurrentEvent(false)
                    return;
                }
            }

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
        tags.push(
            <p key={i} className="rounded-2xl border py-1 px-3">
                {event.tags[i]}
            </p>
        )

    return (
        <div>
            <main>
                <h1 className="text-6xl font-bold mb-4">
                    {event.title || `Event ${event.id}`}
                </h1>
                <Link to={event.url}>
                    <img src={event.thumbnail || "/public/image_not_found.jpg"}/>
                </Link>
                <div className="flex flex-row gap-3 px-2 pt-2 mb-6">
                    {tags}
                </div>

                <p>Host: {event.host}</p>
                <p>{event.viewer_count} views</p>
                <p>Time: {time}</p>
                <p>Status: {currentEvent ? "Live" : "Upcoming"}</p>
                <p>Entry Fee: ${event.entryfee}</p>
                <button className="rounded-xl border py-1 px-3 mt-4">ENTER</button>
            </main>

            <section className="mt-8">
                <h2 className="text-3xl font-bold">Details</h2>
                <p className="px-4">{event.description || <></>}</p>
            </section>

            <section className="mt-8">
                <h2 className="text-3xl font-bold">Prizes</h2>
                <div className="grid grid-cols-10 grid-rows-4 h-[200px]">
                    <div className="col-start-auto col-span-3 row-start-2 row-span-3 border p-4">
                        <p>Second Place:</p>
                        {event.prizes?.[1]}
                    </div>
                    <div className="col-start-4 col-span-4 row-span-4 border p-4">
                        <p>First Place:</p>
                        {event.prizes?.[0]}
                    </div>
                    <div className="col-start-8 col-span-3 row-start-2 row-span-3 border p-4">
                        <p>Third Place:</p>
                        {event.prizes?.[2]}
                    </div>
                </div>
            </section>
        </div>
    );
}
