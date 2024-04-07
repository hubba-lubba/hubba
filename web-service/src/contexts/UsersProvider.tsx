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
                username: 'gamer123',
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
                channel: 'valkyrae_stream',
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
                channel: 'xQc_channel',
                video_urls: ['https://www.twitch.tv/videos/2112925897', 'https://www.twitch.tv/videos/2111857126'],
                joined_events: ['1'],
                past_events: [],
                joined_orgs: ['3'],
                owned_orgs: ['3'],
                platforms: ['Twitch', 'YouTube'],
            },
            {
                user_id: '4',
                username: 'caseoh_',
                email: 'caseoh_@example.com',
                profile_image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ef28ba12-c8ed-46d4-838b-a4c95ef5b469-profile_image-70x70.png',
                bio: 'Join me on epic gaming adventures! Streaming daily on Twitch and YouTube.',
                followers: ['1','2','3'],
                following: ['3', '5'],
                streaming_status: 1,
                channel: 'caseoh_channel',
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
                channel: 'impulse_channel',
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
