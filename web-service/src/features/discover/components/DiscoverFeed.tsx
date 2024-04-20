import { Layout } from '@/components/layout';
import { Shelf } from '@/components/library';
import { EventCard } from '@/features/events/components/EventCard';
import { ChannelCard } from '@/features/users/components/ChannelCard';
import { useEffect, useState } from 'react';
import { Event } from '@/features/events/types';
import { User } from '@/features/users/types';
import { Org } from '@/features/orgs/types';
import { OrgCard } from '@/features/orgs/components/OrgCard';
import { get_upcoming_events } from '@/features/events/api';
import { get_live_users } from '@/features/users/api';
import { get_random_orgs } from '@/features/orgs/api';

export const DiscoverFeed = () => {
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [liveUsers, setLiveUsers] = useState<User[]>([]);
    const [discoverOrgs, setDiscoverOrgs] = useState<Org[]>([]);

    // put this into each feature as a component
    useEffect(() => {
        // once this is complete, move into individual features as a component
        const fetchData = async () => {
            const upcomingEventsData = await get_upcoming_events();
            setUpcomingEvents(upcomingEventsData);

            const liveUsersData = await get_live_users();
            setLiveUsers(liveUsersData);

            const discoverOrgsData = await get_random_orgs();
            setDiscoverOrgs(discoverOrgsData);
        };

        fetchData();
    }, []);

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
