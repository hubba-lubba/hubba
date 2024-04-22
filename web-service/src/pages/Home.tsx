import { Layout } from '@/components/layout';
import { Shelf } from '@/components/library';
import { EventCard } from '@/features/events/components/EventCard';
import { OrgCard } from '@/features/orgs/components/OrgCard';
import { ChannelCard } from '@/features/users/components/ChannelCard';
import { useEffect, useState } from 'react';
import { Event } from '@/features/events/types';
import { User } from '@/features/users/types';
import { Org } from '@/features/orgs/types';
import { get_current_events, get_upcoming_events } from '@/features/events/api';
import { get_live_users } from '@/features/users/api';
import { get_random_orgs } from '@/features/orgs/api';

export const Home = () => {
    const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [liveUsers, setLiveUsers] = useState<User[]>([]);
    const [discoverOrgs, setDiscoverOrgs] = useState<Org[]>([]);

    // put this into each feature as a component
    useEffect(() => {
        // TODO: will need get attending events, joined orgs, followed users functions
        const fetchData = async () => {
            const currentEventsData = await get_current_events();
            setCurrentEvents(currentEventsData ?? currentEvents);

            const upcomingEventsData = await get_upcoming_events();
            setUpcomingEvents(upcomingEventsData ?? upcomingEvents);

            const liveUsersData = await get_live_users();
            setLiveUsers(liveUsersData ?? liveUsers);

            const discoverOrgsData = await get_random_orgs();
            setDiscoverOrgs(discoverOrgsData ?? discoverOrgs);
        };

        fetchData();
    }, [currentEvents, discoverOrgs, liveUsers, upcomingEvents]);

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
