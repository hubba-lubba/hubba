// arrays that hold events and orgs persistent to session
// initialize seed/mock data here.

// user information to load onto webpage: username, profile image, followed streams, events, INBOX

import React, { createContext, useEffect, useState } from 'react';
import { Event } from '@/features/events/types';

interface EventsContextType {
    eventsData: Event[];
    setEventsData: (event: Event[]) => void;
}

export const EventsContext = createContext<EventsContextType>(null!);

export const EventsProvider = ({ children }: React.PropsWithChildren<object>) => {
    const [eventsData, setEventsData] = useState<Event[]>([]);

    useEffect(() => {
        const events = [
            {
                event_id: '0',
                host_org: '2',
                name: `event baloney`,
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                channel: 'channelname',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                time_of: new Date(),
                status: 1,
                prizes: ['prize1', 'prize2', 'prize3'],
                attendees: ['1', '7', '8'],
                url: '',
            },
            {
                event_id: '1',
                host_org: '1',
                name: 'Event 1',
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                channel: 'channelname',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                time_of: new Date('Wed, 16 July 2024 07:45:00 UTC'),
                status: 0,
                prizes: ['prize1', 'prize2', 'prize3'],
                attendees: ['1', '2', '3', '4'],
                url: '',
            },
            {
                event_id: '2',
                host_org: '3',
                name: 'Event 2',
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                channel: 'channelname',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                time_of: new Date('Wed, 27 July 2024 07:45:00 UTC'),
                status: 0,
                prizes: ['prize1', 'prize2', 'prize3'],
                attendees: ['6', '2'],
                url: '',
            },
            {
                event_id: '3',
                host_org: '3',
                name: 'Event 3',
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                channel: 'channelname',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                time_of: new Date('Wed, 31 July 2024 07:45:00 UTC'),
                status: 0,
                prizes: ['prize1', 'prize2', 'prize3'],
                attendees: ['9', '7', '8'],
                url: '',
            },
            // current events (status=1)
            {
                event_id: '4',
                host_org: '3',
                name: 'Event 4',
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                channel: 'channelname',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                time_of: new Date(),
                status: 1,
                prizes: ['prize1', 'prize2', 'prize3'],
                attendees: ['2', '5'],
                url: '',
            },
            {
                event_id: '5',
                host_org: '5',
                name: 'Event 5',
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                channel: 'channelname',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                time_of: new Date(),
                status: 1,
                prizes: ['prize1', 'prize2', 'prize3'],
                attendees: ['6', '4'],
                url: '',
            },
            {
                event_id: '6',
                host_org: '4',
                name: 'Event 6',
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                channel: 'channelname',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                time_of: new Date(),
                status: 1,
                prizes: ['prize1', 'prize2', 'prize3'],
                attendees: ['3', '6', '9'],
                url: '',
            },
        ];
        setEventsData(events as Event[]);
    }, []);

    return (
        <EventsContext.Provider
            value={{
                eventsData,
                setEventsData,
            }}
        >
            {children}
        </EventsContext.Provider>
    );
};
