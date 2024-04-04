import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getMockEvent } from '../api';
import { Event } from '../types';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout';

export const EventPage = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [tags, setTags] = useState<React.ReactElement[]>([]);

    useEffect(() => {
        if (!id) return; //do smt else abt this (but safer)

        const fetchEventData = async (id: string) => {
            const eventData = (await getMockEvent(id)).event;
            setEvent(eventData);

            //make Tag feature and component
            const tags = [];
            for (let i = 0; i < eventData.tags.length; i++) {
                tags.push(
                    <div
                        key={`tag-${eventData.event_id}-${i}`}
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
        <PageLayout>
            <div className="flex flex-col">
                <section className="flex flex-row items-center space-x-4">
                    <Link to={event.url} className="w-[500px]">
                        <img
                            src={
                                event.thumbnail || '/public/image_not_found.jpg'
                            }
                            className="rounded"
                            width={500}
                        />
                    </Link>

                    <div className="flex w-6/12 flex-col space-y-6">
                        <h1 className="text-4xl font-bold">
                            [{event.status}]{event.title || `Event ${event.event_id}`}
                        </h1>
                        <div className="flex flex-row gap-2">{tags}</div>
                        <p className="">Hosted by {event.host}</p>
                        <p className="">{time}</p>
                        <div className="flex w-full items-center justify-center">
                            <button className="w-[150px] rounded-2xl bg-hubba-500 px-3 py-2 font-bold">
                                ENTER
                            </button>
                        </div>
                    </div>
                </section>
                <section className="scroll-gutter flex flex-col space-y-4 overflow-y-auto">
                    <div className="mt-4">
                        <h2 className="mb-4 text-2xl font-bold">DETAILS</h2>
                        <p className="px-4">{event.description}</p>
                    </div>
                    <div>
                        <h2 className="mb-4 text-2xl font-bold">PRIZES</h2>
                        <div className="grid grid-cols-[180px_1fr] gap-8 px-6">
                            <p className="inline font-bold">First Place:</p>
                            <p className="self-end">{event.prizes?.[0]}</p>
                            <p className="inline font-bold">Second Place:</p>
                            {event.prizes?.[1]}
                            <p className="inline font-bold">Third Place:</p>
                            {event.prizes?.[2]}
                        </div>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
};
