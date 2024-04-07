import { Layout } from '@/components/layout';
import { Shelf } from '@/components/library';
import { EventCard } from '@/features/events/components/EventCard';
import { OrgCard } from '@/features/orgs/components/OrgCard';
import { ChannelCard } from '@/features/users/components/ChannelCard';
import { useContext, useEffect, useState } from 'react';
import { Event } from '@/features/events/types';
import { User } from '@/features/users/types';
import { Org } from '@/features/orgs/types';
import { EventsContext } from '@/contexts/EventsProvider';
import { OrgsContext } from '@/contexts/OrgsProvider';
import { UsersContext } from '@/contexts/UsersProvider';

export const Home = () => {
    const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [liveUsers, setLiveUsers] = useState<User[]>([]);
    const [discoverOrgs, setDiscoverOrgs] = useState<Org[]>([]);
    const { getCurrentEvents, getUpcomingEvents } = useContext(EventsContext);
    const { getDiscoverOrgs } = useContext(OrgsContext);
    const { getLiveUsers } = useContext(UsersContext);

    // put this into each feature as a component
    useEffect(() => {
        // TODO: will need get attending events, joined orgs, followed users functions
        const fetchData = async () => {
            const currentEventsData = await getCurrentEvents();
            setCurrentEvents(currentEventsData.events);

            const upcomingEventsData = await getUpcomingEvents();
            setUpcomingEvents(upcomingEventsData.events);

            const liveUsersData = await getLiveUsers();
            setLiveUsers(liveUsersData.users);

            const discoverOrgsData = await getDiscoverOrgs();
            setDiscoverOrgs(discoverOrgsData.orgs);
        };

        fetchData();
    }, [getCurrentEvents, getUpcomingEvents, getLiveUsers, getDiscoverOrgs]);

    return (
        <Layout style="w-full flex-col">
            <Shelf title="Current Events">
                {currentEvents.map((event, index) => (
                    <EventCard
                        key={`current-${event.event_id}-${index}`}
                        event={event}
                    ></EventCard>
                ))}
            </Shelf>
            <Shelf title="Upcoming Events">
                {upcomingEvents.map((event, index) => (
                    <EventCard
                        key={`upcoming-${event.event_id}-${index}`}
                        event={event}
                    ></EventCard>
                ))}
            </Shelf>
            <Shelf title="Orgs" variant="small">
                {discoverOrgs.map((org, index) => (
                    <OrgCard
                        key={`org-${org.org_id}-${index}`}
                        org={org}
                    ></OrgCard>
                ))}
            </Shelf>
            <Shelf title="Live">
                {liveUsers.map((user, index) => (
                    <ChannelCard
                        key={`live-${user.user_id}-${index}`}
                        user={user}
                    ></ChannelCard>
                ))}
            </Shelf>
        </Layout>
    );
};
