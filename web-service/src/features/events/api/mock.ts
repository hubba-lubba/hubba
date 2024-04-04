import { User } from '@/features/users/types';
import { Event } from '../types';

export const getCurrentEvents = async (): Promise<{ events: Event[] }> => {
    const data = {
        events: [
            {
                event_id: '1',
                host_org: '1',
                name: 'Event 1',
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                channel: 'channelname',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                time_of: new Date('Wed, 27 July 2016 07:45:00 UTC'),
                status: 1,
                prizes: ['prize1', 'prize2', 'prize3'],
            } as Event,
            {
                event_id: '2',
                host_org: '2',
                name: 'Event 2',
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                channel: 'channelname',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                time_of: new Date('Wed, 27 July 2016 07:45:00 UTC'),
                status: 1,
                prizes: ['prize1', 'prize2', 'prize3'],
            } as Event,
            {
                event_id: '3',
                host_org: '3',
                name: 'Event 3',
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                channel: 'channelname',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                time_of: new Date('Wed, 27 July 2016 07:45:00 UTC'),
                status: 1,
                prizes: ['prize1', 'prize2', 'prize3'],
            } as Event,
        ],
    };
    return data;
};

export const getUpcomingEvents = async (): Promise<{ events: Event[] }> => {
    const data = {
        events: [
            {
                event_id: '1',
                host_org: '1',
                name: 'Event 1',
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                channel: 'channelname',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                time_of: new Date('Wed, 27 July 2016 07:45:00 UTC'),
                status: 0,
                prizes: ['prize1', 'prize2', 'prize3'],
            } as Event,
            {
                event_id: '2',
                host_org: '2',
                name: 'Event 2',
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                channel: 'channelname',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                time_of: new Date('Wed, 27 July 2016 07:45:00 UTC'),
                status: 0,
                prizes: ['prize1', 'prize2', 'prize3'],
            } as Event,
            {
                event_id: '3',
                host_org: '3',
                name: 'Event 3',
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                channel: 'channelname',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                time_of: new Date('Wed, 27 July 2016 07:45:00 UTC'),
                status: 0,
                prizes: ['prize1', 'prize2', 'prize3'],
            } as Event,
        ],
    };
    return data;
};

export const getSidebarEvents = async (user: User): Promise<Event[]> => {
    // current and upcoming? we want only ours so maybe query api for user's events (current and upcoming)
    // but homepage might have current events that are popular (or do this for discover only - homepage is curated only for user)
    // but in the latter case it makes the sidebar obsolete... hmm
    // UI/UX INTERNS ASSEMBLE
    const data = Promise.all(
        user.joined_events.map(async (id) => (await getMockEvent(id)).event),
    );
    return data;
};

export const getMockEvent = async (id: string): Promise<{ event: Event }> => {
    // get event by id
    // return event
    const data = {
        event: {
            event_id: id,
            host_org: '1',
            name: `event ${id}`,
            thumbnail: 'https://placehold.co/600x400',
            description: 'This is a description',
            channel: 'channelname',
            platform: 'Twitch',
            tags: ['tag1', 'tag2', 'tag3'],
            time_of: new Date('Wed, 27 July 2016 07:45:00 UTC'),
            status: 1,
            prizes: ['prize1', 'prize2', 'prize3'],
        } as Event,
    };

    return data;
};
