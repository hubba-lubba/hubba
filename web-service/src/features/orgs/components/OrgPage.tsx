import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Org } from '../types';
import { User } from '@/features/users/types';
import { Button } from '@/components/elements/buttons';
import { useNavigate } from 'react-router-dom';
import Linkify from 'linkify-react';
import { PageLayout } from '@/components/layout';
import { Pfp } from '@/components/elements';
import { UserContext } from '@/contexts/UserProvider';
import { UsersContext } from '@/contexts/UsersProvider';
import { Event } from '@/features/events/types';
import { statuses } from '@/lib/constants';
import { formatTime } from '@/utils/time';
import { OrgsContext } from '@/contexts/OrgsProvider';
import { EventsContext } from '@/contexts/EventsProvider';

const MemberCard = ({ user_id }: { user_id: string }) => {
    const [user, setUser] = useState<User>();
    const { getMockUser } = useContext(UsersContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const userData = (await getMockUser(user_id)).user;
            setUser(userData);
        };

        fetchData();
    }, [user_id, getMockUser]);

    return (
        <Button
            variant="image"
            icon={<Pfp image={user?.profile_image} />}
            handleClick={() => navigate(`/user/${user_id}`)}
            style="w-[225px] p-2 !h-12 flex align-center rounded bg-hubba-800"
        >
            {user?.username ?? `User ${user_id}`}
        </Button>
    );
};

export const OrgPage = () => {
    const [org, setOrg] = useState<Org>();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const { userData, addOrgToUser, removeOrgFromUser } =
        useContext(UserContext);
    const { addUserToOrg, removeUserFromOrg } = useContext(OrgsContext);
    const { getMockOrg } = useContext(OrgsContext);
    const { getMockEvents } = useContext(EventsContext);
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            const orgData = (await getMockOrg(id)).org;
            setOrg(orgData);
            setLoading(false);
        };

        fetchData().catch((err) => setError('Error loading page: ' + err));
    }, [id, getMockOrg]);

    useEffect(() => {
        if (!org) return;
        const fetchEvents = async () => {
            const eventsData = await getMockEvents(org.events);
            setEvents(eventsData);
        };

        fetchEvents();
    }, [org, getMockEvents]);

    const joinOrg = async (org_id: string) => {
        await addUserToOrg(org_id);
        await addOrgToUser(org_id);
    };
    const leaveOrg = async (org_id: string) => {
        await removeUserFromOrg(org_id);
        await removeOrgFromUser(org_id);
    };

    if (!id) return <div>Org not found</div>;
    if (!org) return <div>Org not found</div>;
    if (loading) return <p>Loading events...</p>;
    if (error) return <div>{error}</div>;

    return (
        <PageLayout>
            <div className="flex h-full flex-col lg:flex-row">
                <div className="flex h-full w-8/12 flex-col">
                    <div className="flex flex-row items-center">
                        <div className="min-w-[250px]">
                            <img
                                className="rounded"
                                src={org.image}
                                alt={org.name}
                                width={250}
                            />
                        </div>
                        <div className="space-y-6 px-4">
                            <h1 className="text-4xl font-bold">{org.name}</h1>
                            <div>
                                {`${org.users.length} ${org.users.length == 1 ? 'Member' : 'Members'}`}
                            </div>
                            <Linkify
                                as="div"
                                options={{
                                    target: '_blank',
                                    className: 'underline',
                                }}
                            >
                                {org.description}
                            </Linkify>
                            {userData && (
                                <div className="flex w-full items-center justify-center">
                                    <button
                                        className="w-[150px] rounded-2xl bg-hubba-500 px-3 py-2 font-bold"
                                        onClick={() =>
                                            userData.joined_orgs.includes(
                                                org.org_id,
                                            )
                                                ? leaveOrg(org.org_id)
                                                : joinOrg(org.org_id)
                                        }
                                    >
                                        {userData.joined_orgs.includes(
                                            org.org_id,
                                        )
                                            ? 'LEAVE'
                                            : 'JOIN'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 py-4">
                        <h1 className="text-2xl">Events</h1>
                        {events.map((event, index) => (
                            <div
                                key={`event-${org.org_id}-${index}`}
                                className="flex w-full cursor-pointer justify-between rounded bg-hubba-800 p-4"
                                onClick={() =>
                                    navigate(`/events/${event.event_id}`)
                                }
                            >
                                <span>
                                    [{statuses[event.status]}] {event.name}
                                </span>
                                <span>{formatTime(event.time_of)}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="scroll-gutter mt-6 flex w-full min-w-[300px] flex-col items-center justify-start space-y-4 overflow-y-auto lg:mt-0 lg:w-4/12 lg:px-8">
                    {org.users.map((user_id, index) => (
                        <MemberCard
                            key={`member-${org.org_id}-${index}`}
                            user_id={user_id}
                        />
                    ))}
                </div>
            </div>
        </PageLayout>
    );
};
