// arrays that hold events and orgs persistent to session
// initialize seed/mock data here.

// user information to load onto webpage: username, profile image, followed streams, events, INBOX

import React, { createContext, useEffect, useState } from 'react';
import { User } from '@/features/users/types';

interface UsersContextType {
    usersData: User[];
    setUsersData: (user: User[]) => void;
}

export const UsersContext = createContext<UsersContextType>(null!);

export const UsersProvider = ({ children }: React.PropsWithChildren<object>) => {
    const [usersData, setUsersData] = useState<User[]>([]);

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

        setUsersData(users as User[]);
    }, []);

    return (
        <UsersContext.Provider
            value={{
                usersData,
                setUsersData,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};
