import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getEvent } from '../api';
import { Event } from '../types';
import { Link } from 'react-router-dom';

export const EventPage = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [tags, setTags] = useState<React.ReactElement[]>([]);

    useEffect(() => {
        if (!id) return; //do smt else abt this (but safer)

        const fetchEventData = async (id: string) => {
            const eventData = (await getEvent(id)).event;
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

    if (!id) return <div>Event not found</div>; //do smt else abt this i think
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
            <div className="lg:grid lg:grid-cols-[400px_1fr] lg:grid-rows-4 lg:gap-4">
                <main
                    className="mb-4 overflow-hidden lg:col-start-2 lg:row-span-3
                    lg:flex lg:flex-col lg:gap-2 lg:px-6"
                >
                    <h1 className="mb-6 text-4xl font-bold lg:m-0">
                        {event.title || `Event ${event.id}`}
                    </h1>
                    <div className="my-4 flex flex-row gap-2">{tags}</div>
                    <p className="text-2xl font-bold lg:text-xl">
                        {event.status}
                    </p>
                    <p className="">{time}</p>
                    <p className="">Host: {event.host}</p>
                </main>

                <div className="lg:row-span-full">
                    <Link to={event.url}>
                        <img
                            src={
                                event.thumbnail || '/public/image_not_found.jpg'
                            }
                            className="w-full"
                        />
                    </Link>
                </div>

                <button
                    className="mt-6 w-full rounded-2xl bg-hubba-500 px-3 py-2 font-bold
                    lg:relative lg:bottom-4 lg:left-6 lg:col-start-2 lg:mt-0 lg:w-1/3"
                >
                    {'ENTER'}
                </button>
            </div>

            <section className="my-12">
                <h2 className="mb-4 text-4xl font-bold">DETAILS</h2>
                <p className="px-4">{event.description || <></>}</p>
            </section>

            <section>
                <h2 className="mb-4 text-4xl font-bold">PRIZES</h2>
                <div className="grid grid-cols-[180px_1fr] gap-8 px-6">
                    <p className="inline text-3xl font-bold">First Place:</p>
                    <p className="self-end">{event.prizes?.[0]}</p>
                    <p className="inline text-xl font-bold">Second Place:</p>
                    {event.prizes?.[1]}
                    <p className="inline text-xl font-bold">Third Place:</p>
                    {event.prizes?.[2]}
                </div>
            </section>
        </div>
    );
};
