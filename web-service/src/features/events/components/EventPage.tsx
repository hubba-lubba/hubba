import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { getEvent } from '@/features/events/api';
import { Event } from '@/features/events/types';
import { Link } from 'react-router-dom';

export const EventPage = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [tags, setTags] = useState<React.ReactElement[]>([]);

    if (!id) return <div>Event not found</div>; //do smt else abt this i think

    useEffect(() => {
        const fetchEventData = async (id: string) => {
            const eventData = await getEvent(id);
            setEvent(eventData);

            //make Tag feature and component
            const tags = [];
            for (let i = 0; i < eventData.tags.length; i++) {
                tags.push(
                    <div
                        key={`tag-${eventData.id}-${i}`}
                        className="rounded-2xl border px-3 py-1"
                    >
                        {eventData.tags[i]}
                    </div>,
                );
            }
            setTags(tags);

            setLoading(false);
        };

        fetchEventData(id).catch((err) =>
            setError('Error loading page: ' + err),
        );
    }, [id]);

    if (!event) return <div>Event not found</div>;
    if (loading) return <p>Loading events...</p>;
    if (error) return <div>error</div>;

    const time = event.time_of_event.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
        timeZoneName: 'short',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
    });

    return (
        <div>
            <div className="lg:grid lg:grid-cols-[300px_1fr] lg:grid-rows-3 lg:gap-4">
                <main className="mb-4 lg:col-start-2 lg:row-span-2 lg:px-6
                    lg:flex lg:flex-col lg:gap-2">
                    <h1 className="text-4xl font-bold">
                        {event.title || `Event ${event.id}`}
                    </h1>
                    <p className="lg:text-xl">
                        {time}
                    </p>
                    <p className="lg:text-xl">Host: {event.host}</p>
                </main>

                <Link to={event.url} className="lg:row-span-full">
                    <img src={event.thumbnail || "/public/image_not_found.jpg"} />
                </Link>

                <button className="rounded-2xl py-2 px-3 w-full bg-hubba-500 font-bold mt-6
                    lg:col-start-2 lg:relative lg:bottom-4 lg:w-1/3 lg:left-6 lg:mt-0">
                    {`ENTER: ${event.entryfee}$`}
                </button>
            </div>

            <section className="my-12 p-8">
                <h2 className="text-4xl font-bold mb-4">DETAILS</h2>
                <p className="px-4">{event.description || <></>}</p>
            </section>

            <section className="px-8">
                <h2 className="text-4xl font-bold mb-4">PRIZES</h2>
                <div className="grid grid-cols-[180px_1fr] gap-8 px-6">
                    <p className="font-bold text-3xl inline">First Place:</p>
                    <p className="self-end">{event.prizes?.[0]}</p>
                    <p className="font-bold text-xl inline">Second Place:</p>
                    {event.prizes?.[1]}
                    <p className="font-bold text-xl inline">Third Place:</p>
                    {event.prizes?.[2]}
                </div>
            </section>
        </div>
    );
};
