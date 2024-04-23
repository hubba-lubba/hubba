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
import { Event } from '@/features/events/types';
import { statuses } from '@/lib/constants';
import { formatTime } from '@/utils/time';
import { get_user } from '@/features/users/api';
import { add_user_to_org, get_org, remove_user_from_org } from '../api';
import { get_event } from '@/features/events/api';

const MemberCard = ({ user_id }: { user_id: string }) => {
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const userData = await get_user(user_id);
            setUser(userData);
        };

        fetchData();
    }, [user_id]);

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
    const { userData, userOrgs, setUserOrgs, userHasOrg } =
        useContext(UserContext);
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            const orgData = await get_org(id);
            setOrg(orgData);
            setLoading(false);
        };

        fetchData().catch((err) => setError('Error loading page: ' + err));
    }, [id, userOrgs]);

    useEffect(() => {
        if (!org) return;
        const fetchEvents = async () => {
            const eventsData = await Promise.all(
                org.events.map(async (event_id) => await get_event(event_id)),
            );
            setEvents(eventsData);
        };

        fetchEvents();
    }, [org]);

    const joinOrg = async (org: Org) => {
        const orgData = await add_user_to_org(org.org_id);
        setUserOrgs([...userOrgs, orgData]);
    };
    const leaveOrg = async (org: Org) => {
        const orgData = await remove_user_from_org(org.org_id);
        setUserOrgs(userOrgs.filter((org) => org.org_id !== orgData.org_id));
    };

    if (!id) return <div>Org not found</div>;
    if (loading) return <p>Loading org...</p>;
    if (!org) return <div>Org not found</div>;
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
                                <div className="flex w-full items-center justify-center space-x-4">
                                    {userData.user_id === org.owner ? (
                                        <button
                                            className="w-[150px] rounded-2xl bg-hubba-500 px-3 py-2 font-bold"
                                            onClick={() =>
                                                navigate(
                                                    `/orgs/${org.org_id}/settings`,
                                                )
                                            }
                                        >
                                            SETTINGS
                                        </button>
                                    ) : (
                                        <button
                                            className="w-[150px] rounded-2xl bg-hubba-500 px-3 py-2 font-bold"
                                            onClick={() =>
                                                userHasOrg(org.org_id)
                                                    ? leaveOrg(org)
                                                    : joinOrg(org)
                                            }
                                        >
                                            {userHasOrg(org.org_id)
                                                ? 'LEAVE'
                                                : 'JOIN'}
                                        </button>
                                    )}
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
