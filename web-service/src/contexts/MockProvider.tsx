// arrays that hold events and orgs persistent to session
// initialize seed/mock data here.

// user information to load onto webpage: username, profile image, followed streams, events, INBOX

import React, { createContext, useEffect, useState } from 'react';
import { Event } from '@/features/events/types';
import { Org } from '@/features/orgs/types';
import { User } from '@/features/users/types';

interface MockContextType {
    mockEventsData: Event[];
    setMockEventsData: (event: Event[]) => void;
    mockOrgsData: Org[];
    setMockOrgsData: (org: Org[]) => void;
    mockUsersData: User[];
    setMockUsersData: (user: User[]) => void;
}

export const MockContext = createContext<MockContextType>(null!);

export const MockProvider = ({ children }: React.PropsWithChildren<object>) => {
    const [mockEventsData, setMockEventsData] = useState<Event[]>([]);
    const [mockOrgsData, setMockOrgsData] = useState<Org[]>([]);
    const [mockUsersData, setMockUsersData] = useState<User[]>([]);

    useEffect(() => {
        // set mock data here
        const users = [
            {
                user_id: '1',
                username: 'user with id 1',
                email: 'email1',
                profile_image: undefined,
                bio: 'bio1',
                followers: ['2'],
                following: ['3', '2', '4', '6'],
                streaming_status: 1,
                channel: 'caseoh_',
                video_urls: ['video_url1', 'video_url2'],
                joined_events: ['event1', 'event2'],
                past_events: ['event3', 'event4'],
                joined_orgs: ['org1', 'org2', 'org3', 'org4', 'org5', 'org6'],
                owned_orgs: ['1', '5'],
                platforms: ['platform1', 'platform2'],
            },
            {
                user_id: '2',
                username: 'user with id 2',
                email: 'email1',
                profile_image: undefined,
                bio: 'bio1',
                followers: ['3', '1'],
                following: ['3', '1', '8', '9'],
                streaming_status: 1,
                channel: 'faide',
                video_urls: ['video_url1', 'video_url2'],
                joined_events: ['event1', 'event2'],
                past_events: ['event3', 'event4'],
                joined_orgs: ['org1', 'org2', 'org3', 'org4', 'org5', 'org6'],
                owned_orgs: ['2'],
                platforms: ['platform1', 'platform2'],
            },
            {
                user_id: '3',
                username: 'user with id 3',
                email: 'email1',
                profile_image: undefined,
                bio: 'bio1',
                followers: ['2', '1'],
                following: ['1', '2', '4', '5'],
                streaming_status: 1,
                channel: 'xQc',
                video_urls: ['video_url1', 'video_url2'],
                joined_events: ['event1', 'event2'],
                past_events: ['event3', 'event4'],
                joined_orgs: ['org1', 'org2', 'org3', 'org4', 'org5', 'org6'],
                owned_orgs: ['3'],
                platforms: ['platform1', 'platform2'],
            },
            {
                user_id: '4',
                username: 'user with id 4',
                email: 'email1',
                profile_image: undefined,
                bio: 'bio1',
                followers: ['2', '1'],
                following: ['1', '2', '3', '5'],
                streaming_status: 1,
                channel: 'ninja',
                video_urls: ['video_url1', 'video_url2'],
                joined_events: ['event1', 'event2'],
                past_events: ['event3', 'event4'],
                joined_orgs: ['org1', 'org2', 'org3', 'org4', 'org5', 'org6'],
                owned_orgs: ['4'],
                platforms: ['platform1', 'platform2'],
            },
            {
                user_id: '5',
                username: 'user with id 5',
                email: 'email1',
                profile_image: undefined,
                bio: 'bio1',
                followers: ['2', '1'],
                following: ['1', '2', '3', '4'],
                streaming_status: 1,
                channel: 'shroud',
                video_urls: ['video_url1', 'video_url2'],
                joined_events: ['event1', 'event2'],
                past_events: ['event3', 'event4'],
                joined_orgs: ['org1', 'org2', 'org3', 'org4', 'org5', 'org6'],
                owned_orgs: [],
                platforms: ['platform1', 'platform2'],
            },
            {
                user_id: '6',
                username: 'user with id 6',
                email: 'email1',
                profile_image: undefined,
                bio: 'bio1',
                followers: ['2', '1'],
                following: ['1', '2', '3', '4'],
                streaming_status: 1,
                channel: 'summit1g',
                video_urls: ['video_url1', 'video_url2'],
                joined_events: ['event1', 'event2'],
                past_events: ['event3', 'event4'],
                joined_orgs: ['org1', 'org2', 'org3', 'org4', 'org5', 'org6'],
                owned_orgs: [],
                platforms: ['platform1', 'platform2'],
            },
            {
                user_id: '7',
                username: 'user with id 7',
                email: 'email1',
                profile_image: undefined,
                bio: 'bio1',
                followers: ['2', '1'],
                following: ['1', '2', '3', '4'],
                streaming_status: 1,
                channel: 'timthetatman',
                video_urls: ['video_url1', 'video_url2'],
                joined_events: ['event1', 'event2'],
                past_events: ['event3', 'event4'],
                joined_orgs: ['org1', 'org2', 'org3', 'org4', 'org5', 'org6'],
                owned_orgs: [],
                platforms: ['platform1', 'platform2'],
            },
            {
                user_id: '8',
                username: 'user with id 8',
                email: 'email1',
                profile_image: undefined,
                bio: 'bio1',
                followers: ['2', '1'],
                following: ['1', '2', '3', '4'],
                streaming_status: 1,
                channel: 'lirik',
                video_urls: ['video_url1', 'video_url2'],
                joined_events: ['event1', 'event2'],
                past_events: ['event3', 'event4'],
                joined_orgs: ['org1', 'org2', 'org3', 'org4', 'org5', 'org6'],
                owned_orgs: [],
                platforms: ['platform1', 'platform2'],
            },
            {
                user_id: '9',
                username: 'user with id 9',
                email: 'email1',
                profile_image: undefined,
                bio: 'bio1',
                followers: ['2', '1'],
                following: ['1', '2', '3', '4'],
                streaming_status: 1,
                channel: 'drdisrespect',
                video_urls: ['video_url1', 'video_url2'],
                joined_events: ['event1', 'event2'],
                past_events: ['event3', 'event4'],
                joined_orgs: ['org1', 'org2', 'org3', 'org4', 'org5', 'org6'],
                owned_orgs: [],
                platforms: ['platform1', 'platform2'],
            },
        ];

        setMockUsersData(users as User[]);

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
        setMockEventsData(events as Event[]);

        const orgs = [
            {
                org_id: '1',
                name: `org 1`,
                image: 'https://via.placeholder.com/250',
                description:
                    'org1 description. \n join us at https://www.google.com!',
                channel: 'caseoh_',
                owner: '1',
                moderators: ['mod1', 'mod2'],
                users: ['1', '2', '3', '4'],
                events: ['1', '4'],
                created: new Date(),
            },
            {
                org_id: '2',
                name: `org 2`,
                image: 'https://via.placeholder.com/250',
                description:
                    'org2 description. \n join us at https://www.google.com!',
                channel: 'faide',
                owner: '2',
                moderators: ['mod1', 'mod2'],
                users: ['1', '2', '3', '4'],
                events: ['0'],
                created: new Date(),
            },
            {
                org_id: '3',
                name: `org 3`,
                image: 'https://via.placeholder.com/250',
                description:
                    'org3 description. \n join us at https://www.google.com!',
                channel: 'xQc',
                owner: '3',
                moderators: ['mod1', 'mod2'],
                users: ['3', '1', '2', '4'],
                events: ['4', '2'],
                created: new Date(),
            },
            {
                org_id: '4',
                name: `org 4`,
                image: 'https://via.placeholder.com/250',
                description:
                    'org4 description. \n join us at https://www.google.com!',
                channel: 'ninja',
                owner: '4',
                moderators: ['mod1', 'mod2'],
                users: ['4', '1', '2', '3'],
                events: ['6'],
                created: new Date(),
            },
            {
                org_id: '5',
                name: `org 5`,
                image: 'https://via.placeholder.com/250',
                description:
                    'org5 description. \n join us at https://www.google.com!',
                channel: 'shroud',
                owner: '1',
                moderators: ['mod1', 'mod2'],
                users: ['1', '2', '3'],
                events: ['5'],
                created: new Date(),
            },
        ];

        setMockOrgsData(orgs as Org[]);
    }, []);

    return (
        <MockContext.Provider
            value={{
                mockEventsData,
                setMockEventsData,
                mockOrgsData,
                setMockOrgsData,
                mockUsersData,
                setMockUsersData,
            }}
        >
            {children}
        </MockContext.Provider>
    );
};
