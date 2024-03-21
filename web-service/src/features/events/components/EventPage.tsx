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
    }, []);

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
        <div className="max-w-[600px]">
            <header className="mb-4">
                <h1 className="text-6xl font-bold">
                    {event.title || `Event ${event.id}`}
                </h1>
                <h3 className="text-2xl font-bold">
                    {event.status} {time}
                </h3>
            </header>

            <main>
                <Link to={event.url}>
                    <img
                        src={event.thumbnail || '/public/image_not_found.jpg'}
                    />
                </Link>
                <div className="flex flex-row justify-between px-2 pt-2">
                    <div className="mb-6 flex flex-row gap-3">{tags}</div>
                    <div className="">{event.viewer_count} views</div>
                </div>

                <div>Host: {event.host}</div>
                <button className="mt-4 rounded-xl border px-3 py-1">
                    {`ENTER: ${event.entryfee}$`}
                </button>
            </main>

            <section className="mt-8">
                <h2 className="text-3xl font-bold">Details</h2>
                <div className="px-4">{event.description}</div>
            </section>

            {event.prizes && (
                <section className="mt-8">
                    <h2 className="mb-6 text-3xl font-bold">Prizes</h2>
                    <div className="grid h-[200px] grid-cols-10 grid-rows-4">
                        <div className="col-span-3 col-start-auto row-span-3 row-start-2 border p-4">
                            <div className="text-xl font-bold">
                                Second Place:
                            </div>
                            {event.prizes?.[1]}
                        </div>
                        <div className="col-span-4 col-start-4 row-span-4 border p-4">
                            <div className="text-2xl font-bold">
                                First Place:
                            </div>
                            {event.prizes?.[0]}
                        </div>
                        <div className="col-span-3 col-start-8 row-span-3 row-start-2 border p-4">
                            <div className="text-xl font-bold">
                                Third Place:
                            </div>
                            {event.prizes?.[2]}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};
