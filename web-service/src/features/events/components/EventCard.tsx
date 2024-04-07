import { Card, Thumbnail } from '@/components/library';
import { Event } from '@/features/events/types';
import { useState, useEffect, useContext } from 'react';
import { statuses } from '@/lib/constants';
import { OrgsContext } from '@/contexts/OrgsProvider';
import { Org } from '@/features/orgs/types';
import { TwitchLiveEmbed } from '@/components/external';
import { formatTime } from '@/utils/time';

export const EventCard = ({ event }: { event: Event }) => {
    const [org, setOrg] = useState<Org>();
    const { getMockOrg } = useContext(OrgsContext);

    useEffect(() => {
        const fetchData = async () => {
            // get org by event.org_id
            const orgData = await getMockOrg(event.host_org);
            setOrg(orgData.org);
        };

        fetchData();
    }, [event, getMockOrg]);

    return (
        <Card
            url={`/events/${event.event_id}`}
            media={
                event.status === 0 || !org ? (
                    <Thumbnail src={event.thumbnail} />
                ) : (
                    <TwitchLiveEmbed channel={org.channel} />
                )
            }
            footer={
                <div className="flex w-full flex-row">
                    <div className="flex w-1/2 flex-col">
                        <span>{event.name}</span>
                        <span>{org?.name}</span>
                    </div>
                    <div className="flex w-1/2 flex-col items-end">
                        <span>{statuses[event.status]}</span>
                        <span>{formatTime(event.time_of)}</span>
                    </div>
                </div>
            }
        />
    );
};
