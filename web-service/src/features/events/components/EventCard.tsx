import { Thumbnail, Card } from '@/components/library';
import { Event } from '@/features/events/types';
import { useState, useEffect } from 'react';
import { statuses } from '@/lib/constants';
import { getMockOrg } from '@/features/orgs/api';
import { Org } from '@/features/orgs/types';
import { TwitchLiveEmbed } from '@/components/external';

export const EventCard = ({ event }: { event: Event }) => {
    const [org, setOrg] = useState<Org>();

    useEffect(() => {
        const fetchData = async () => {
            // get org by event.org_id
            const orgData = await getMockOrg(event.host_org, 'caseoh_');
            setOrg(orgData.org);
        };

        fetchData();
    }, [event]);

    return (
        <Card
            url={`events/${event.event_id}`}
            media={
                event.status === 0 || !org ? (
                    <Thumbnail src={event.thumbnail} />
                ) : (
                    <TwitchLiveEmbed channel={org.channel} />
                )
            }
            footer={
                <>
                    <h2>{org?.name}</h2>
                    <h2>{event.time_of.toISOString()}</h2>
                    <h2>{statuses[event.status]}</h2>
                </>
            }
        />
    );
};
