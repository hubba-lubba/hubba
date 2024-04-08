import { Layout } from '@/components/layout';
import { Shelf } from '@/components/library';
import { EventCard } from '@/features/events/components/EventCard';
import { ChannelCard } from '@/features/users/components/ChannelCard';
import { useContext, useEffect, useState } from 'react';
import { Event } from '@/features/events/types';
import { User } from '@/features/users/types';
import { Org } from '@/features/orgs/types';
import { OrgCard } from '@/features/orgs/components/OrgCard';
import { UsersContext } from '@/contexts/UsersProvider';
import { OrgsContext } from '@/contexts/OrgsProvider';
import { EventsContext } from '@/contexts/EventsProvider';

export const DiscoverFeed = () => {
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [liveUsers, setLiveUsers] = useState<User[]>([]);
    const [discoverOrgs, setDiscoverOrgs] = useState<Org[]>([]);
    const { getLiveUsers } = useContext(UsersContext);
    const { getDiscoverOrgs } = useContext(OrgsContext);
    const { getUpcomingEvents } = useContext(EventsContext);
    // put this into each feature as a component
    useEffect(() => {
        // once this is complete, move into individual features as a component
        const fetchData = async () => {
            const upcomingEventsData = await getUpcomingEvents();
            setUpcomingEvents(upcomingEventsData.events);

            const liveUsersData = await getLiveUsers();
            setLiveUsers(liveUsersData.users);

            const discoverOrgsData = await getDiscoverOrgs();
            setDiscoverOrgs(discoverOrgsData.orgs);
        };

        fetchData();
    }, [getUpcomingEvents, getLiveUsers, getDiscoverOrgs]);

    return (
        <Layout style="w-full flex-col">
            <Shelf title="Upcoming Events">
                {upcomingEvents.map((event, index) => (
                    <EventCard
                        key={`upcoming-${event.event_id}-${index}`}
                        event={event}
                    ></EventCard>
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
            <Shelf title="Orgs">
                {discoverOrgs
                    .map((org, index) => (
                        <OrgCard
                            key={`org-${org.org_id}-${index}`}
                            org={org}
                        ></OrgCard>
                    ))
                    .slice(0, 3)}
            </Shelf>
        </Layout>
    );
};
