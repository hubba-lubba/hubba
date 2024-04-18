import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Event } from '../types';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout';
import { formatTime } from '@/utils/time';
import { UserContext } from '@/contexts/UserProvider';
import { EventsContext } from '@/contexts/EventsProvider';
import { statuses } from '@/lib/constants';
import { OrgsContext } from '@/contexts/OrgsProvider';
import { Org } from '@/features/orgs/types';

export const EventPage = () => {
    const { id } = useParams<{ id: string }>();
    const [org, setOrg] = useState<Org>();
    const [event, setEvent] = useState<Event>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const { userData, addEventToUser, removeEventFromUser } =
        useContext(UserContext);
    const {
        getMockEvent,
        addUserToEvent,
        removeUserFromEvent,
        setEventStreamingStatus,
    } = useContext(EventsContext);
    const { getMockOrg } = useContext(OrgsContext);
    // const [tags, setTags] = useState<React.ReactElement[]>([]);

    useEffect(() => {
        if (!id) return; //do smt else abt this (but safer)

        const fetchEventData = async (id: string) => {
            const eventData = (await getMockEvent(id)).event;
            setEvent(eventData);

            const orgData = await getMockOrg(eventData.host_org);
            setOrg(orgData.org);

            //make Tag feature and component
            // const tags = [];
            // for (let i = 0; i < eventData.tags.length; i++) {
            //     tags.push(
            //         <div
            //             key={`tag-${eventData.event_id}-${i}`}
            //             className="rounded-2xl border px-3 py-1"
            //         >
            //             {eventData.tags[i]}
            //         </div>,
            //     );
            // }
            // setTags(tags);

            setLoading(false);
        };

        fetchEventData(id).catch((err) =>
            setError('Error loading page: ' + err),
        );
    }, [id, getMockEvent, getMockOrg]);

    const joinEvent = async (event: Event) => {
        await addUserToEvent(event.event_id);
        await addEventToUser(event.event_id);
    };

    const leaveEvent = async (event: Event) => {
        await removeUserFromEvent(event.event_id);
        await removeEventFromUser(event.event_id);
    };

    if (!id) return <div>Event not found</div>; //do smt else abt this i think
    if (!event) return <div>Event not found</div>;
    if (loading) return <p>Loading events...</p>;
    if (error) return <div>error</div>;

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
                            [{statuses[event.status]}] &nbsp;
                            {event.name || `Event ${event.event_id}`}
                        </h1>
                        {/* <div className="flex flex-row gap-2">{tags}</div> */}
                        <p className="">Hosted by {org?.name}</p>
                        <p className="">{formatTime(event.time_of)}</p>
                        {userData && (
                            <div className="flex w-full items-center justify-center space-x-4">
                                <button
                                    className="w-[150px] rounded-2xl bg-hubba-500 px-3 py-2 font-bold"
                                    onClick={() =>
                                        userData.joined_events.includes(
                                            event.event_id,
                                        )
                                            ? leaveEvent(event)
                                            : joinEvent(event)
                                    }
                                >
                                    {userData.joined_events.includes(
                                        event.event_id,
                                    )
                                        ? 'LEAVE'
                                        : 'ENTER'}
                                </button>
                                {/* TODO: API INTEGRATION - add this as a route */}
                                {userData.owned_orgs.includes(
                                    event.host_org,
                                ) && (
                                    <button
                                        className="w-[150px] rounded-2xl bg-hubba-500 px-3 py-2 font-bold"
                                        onClick={() =>
                                            event.status == 0
                                                ? setEventStreamingStatus(
                                                      event.event_id,
                                                      1,
                                                  )
                                                : setEventStreamingStatus(
                                                      event.event_id,
                                                      0,
                                                  )
                                        }
                                    >
                                        {event.status == 0 ? 'START' : 'STOP'}
                                    </button>
                                )}
                            </div>
                        )}
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
