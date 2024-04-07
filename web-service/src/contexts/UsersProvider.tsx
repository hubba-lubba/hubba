// arrays that hold events and orgs persistent to session
// initialize seed/mock data here.

// user information to load onto webpage: username, profile image, followed streams, events, INBOX

import React, { createContext, useEffect, useState } from 'react';
import { User, Video } from '@/features/users/types';

interface UsersContextType {
    usersData: User[];
    setUsersData: (user: User[]) => void;
    getMockUser: (user_id: string) => Promise<{ user: User }>;
    getMockUsers: (user_ids: string[]) => Promise<User[]>;
    getLiveUsers: () => Promise<{ users: User[] }>;
    getVideos: (user: User) => Promise<Video[]>;
}

export const UsersContext = createContext<UsersContextType>(null!);

export const UsersProvider = ({
    children,
}: React.PropsWithChildren<object>) => {
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
                streaming_status: 0,
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
                streaming_status: 0,
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
                streaming_status: 0,
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
                streaming_status: 0,
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
                streaming_status: 0,
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

    const getMockUser = async (user_id: string): Promise<{ user: User }> => {
        const user = usersData.find((user) => user.user_id === user_id);
        if (user === undefined) throw new Error('User not found');
        const data = {
            user: user,
        };
        return data;
    };

    const getMockUsers = async (user_ids: string[]): Promise<User[]> => {
        const data = Promise.all(
            user_ids.map(async (user_id) => (await getMockUser(user_id)).user),
        );
        return data;
    };

    const getLiveUsers = async (): Promise<{ users: User[] }> => {
        // get users whose streaming_status is 1
        const data = {
            users: usersData.filter((user) => user.streaming_status === 1),
        };
        return data;
    };

    const getVideos = async (user: User): Promise<Video[]> => {
        // https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
        const ytidParser = (url: string): string => {
            const regExp =
                /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = url.match(regExp);
            return match && match[7].length == 11 ? match[7] : '';
        };

        const getVideo = async (url: string): Promise<{ video: Video }> => {
            const video_id = ytidParser(url);
            if (!video_id) throw new Error('no video id found in url');

            const data = {
                video: {
                    video_id: video_id,
                    url: url,
                    title: video_id,
                    thumbnail: `https://img.youtube.com/vi/${video_id}/default.jpg`,
                } as Video,
            };
            return data;
        };

        const data = await Promise.all(
            user.video_urls.map(async (url) => (await getVideo(url)).video),
        );
        return data;
    };

    return (
        <UsersContext.Provider
            value={{
                usersData,
                setUsersData,
                getMockUser,
                getMockUsers,
                getLiveUsers,
                getVideos,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};
