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
                username: 'Gamer123',
                email: 'gamer123@example.com',
                profile_image: 'https://wallpapers.com/images/featured/gaming-profile-pictures-xpcd6q5uud2i45v8.jpg',
                bio: 'Passionate gamer who loves exploring new worlds and completing challenges.',
                followers: [],
                following: ['2','4'],
                streaming_status: 0,
                channel: '',
                video_urls: [],
                joined_events: ['1'],
                past_events: [],
                joined_orgs: [1],
                owned_orgs: [],
                platforms: [],
            },
            {
                user_id: '2',
                username: 'Valkyrae',
                email: 'Valkyrae@example.com',
                profile_image: 'https://yt3.googleusercontent.com/0Qu_iyV5XEUmy7MBd46TqRzsMuTED6M5zvunG8W6GjOrRn3pgs-BSTLREWopbkmzQIC66R_FPDs=s176-c-k-c0x00ffffff-no-rj',
                bio: 'hi! I am a streamer on YouTube!',
                followers: ['1'],
                following: ['3','4'],
                streaming_status: 1,
                channel: 'valkyrae',
                video_urls: ['https://www.youtube.com/watch?v=WzIygALa6a0', 'https://www.youtube.com/watch?v=0vMDoul1NfQ'],
                joined_events: ['2'],
                past_events: [],
                joined_orgs: ['2'],
                owned_orgs: ['1', '2', '5', '6'],
                platforms: ['Twitch', 'Discord', 'YouTube'],
            },
            {
                user_id: '3',
                username: 'xQc',
                email: 'xQc@example.com',
                profile_image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/xqc-profile_image-9298dca608632101-70x70.jpeg',
                bio: 'Pro gamer specializing in competitive multiplayer games. Catch me live on Twitch!',
                followers: ['2','4' ],
                following: ['4'],
                streaming_status: 1,
                channel: 'xQc',
                video_urls: ['https://www.twitch.tv/videos/2112925897', 'https://www.twitch.tv/videos/2111857126'],
                joined_events: ['1'],
                past_events: [],
                joined_orgs: ['3'],
                owned_orgs: ['3'],
                platforms: ['Twitch', 'YouTube'],
            },
            {
                user_id: '4',
                username: 'CaseOh',
                email: 'caseoh_@example.com',
                profile_image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ef28ba12-c8ed-46d4-838b-a4c95ef5b469-profile_image-70x70.png',
                bio: 'Join me on epic gaming adventures! Streaming daily on Twitch and YouTube.',
                followers: ['1','2','3'],
                following: ['3', '5'],
                streaming_status: 1,
                channel: 'caseoh_',
                video_urls: ['https://www.twitch.tv/caseoh_/clip/DeterminedSeductiveOrangeDancingBaby-3sXV2RmiXQ7LTyIo'],
                joined_events: ['4', '5'],
                past_events: [],
                joined_orgs: ['2','4'],
                owned_orgs: ['4'],
                platforms: ['Twitch', 'YouTube'],
            },
            {
                user_id: '5',
                username: 'ImpulseSV',
                email: 'impulse@example.com',
                profile_image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2dd0feb9-1117-4ac4-9d46-0d547e382529-profile_image-70x70.png',
                bio: 'Relax and unwind with me as I play your favorite games. Streaming on Twitch!',
                followers: ['4'],
                following: [],
                streaming_status: 1,
                channel: 'impulse',
                video_urls: ['https://www.twitch.tv/videos/2113485196'],
                joined_events: [],
                past_events: [],
                joined_orgs: ['4'],
                owned_orgs: [],
                platforms: ['Twitch', 'YouTube'],
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
                    thumbnail: `https://img.youtube.com/vi/${video_id}/maxresdefault.jpg`,
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