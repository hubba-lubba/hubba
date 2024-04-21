// user information to load onto webpage: username, profile image, followed streams, events, INBOX

import React, { createContext, useEffect, useState } from 'react';
import { User } from '@/features/users/types';
import { Event } from '@/features/events/types';
import { Org } from '@/features/orgs/types';
import {
    create_user,
    add_video,
    follow_user,
    unfollow_user,
    update_user,
    get_user,
} from '@/features/users/api';
import { get_user_orgs } from '@/features/orgs/api';
import { get_user_events, update_event } from '@/features/events/api';
import { editemail, editpassword, editusername } from '@/lib/auth';

interface UserContextType {
    userData: User;
    setUserData: (user: User) => void;
    userChannels: User[];
    setUserChannels: (user: User[]) => void;
    userEvents: Event[];
    setUserEvents: (events: Event[]) => void;
    userOrgs: Org[];
    setUserOrgs: (orgs: Org[]) => void;

    createUser: () => Promise<void>;
    followUser: (user_id: string) => Promise<void>;
    unfollowUser: (user_id: string) => Promise<void>;
    userHasEvent: (event_id: string) => boolean;
    userHasOrg: (org_id: string) => boolean;
    userHasChannel: (user_id: string) => boolean;
    setStreamStatus: (status: 0 | 1) => Promise<void>;
    editBio: (bio: string) => Promise<void>;
    editProfileImage: (profile_image: string) => Promise<void>;
    editChannel: (channel: string) => Promise<void>;
    uploadVideo: (video_url: string) => Promise<void>;

    editUsername: (username: string) => Promise<void>;
    editEmail: (email: string) => Promise<void>;
    changePassword: (password: string, newPassword: string) => Promise<void>;

    setEventStreamingStatus: (event_id: string, status: 0 | 1) => Promise<void>;
}

export const UserContext = createContext<UserContextType>(null!);

export const UserProvider = ({ children }: React.PropsWithChildren<object>) => {
    const [userData, setUserData] = useState<User>(null!);
    const [userChannels, setUserChannels] = useState<User[]>([]);
    const [userEvents, setUserEvents] = useState<Event[]>([]);
    const [userOrgs, setUserOrgs] = useState<Org[]>([]);

    useEffect(() => {
        console.log('user data', userData);
        const fetchData = async () => {
            const channels = await Promise.all(
                userData.following.map((user_id) => get_user(user_id)),
            );
            setUserChannels(channels);
            const events = await get_user_events();
            setUserEvents(events);
            const orgs = await get_user_orgs();
            setUserOrgs(orgs);
        };

        if (userData) {
            fetchData();
        }
    }, [userData]);

    // user methods
    const createUser = async () => {
        const user = await create_user();
        setUserData(user);
    };
    const followUser = async (user_id: string) => {
        const user = await follow_user(user_id);
        setUserData(user);
    };
    const unfollowUser = async (user_id: string) => {
        const user = await unfollow_user(user_id);
        setUserData(user);
    };
    const userHasEvent = (event_id: string) => {
        return userEvents.some((event) => event.event_id === event_id);
    };
    const userHasOrg = (org_id: string) => {
        return userOrgs.some((org) => org.org_id === org_id);
    };
    const userHasChannel = (user_id: string) => {
        return userChannels.some((channel) => channel.user_id === user_id);
    };
    const setStreamStatus = async (status: 0 | 1) => {
        const user = await update_user({ streaming_status: status });
        setUserData(user);
    };
    const editBio = async (bio: string) => {
        const user = await update_user({ bio: bio });
        setUserData(user);
    };
    const editProfileImage = async (profile_image: string) => {
        const user = await update_user({ profile_image: profile_image });
        setUserData(user);
    };
    const editChannel = async (channel: string) => {
        const user = await update_user({ channel: channel });
        setUserData(user);
    };
    // TODO: implement thunmbnails, title
    const uploadVideo = async (video_url: string) => {
        const user = await add_video(video_url);
        setUserData(user);
    };

    // auth methods
    const editUsername = async (username: string) => {
        await editusername(username);
    };

    const editEmail = async (email: string) => {
        await editemail(email);
    };

    const changePassword = async (password: string, newPassword: string) => {
        await editpassword(password, newPassword);
    };

    // event methods
    const setEventStreamingStatus = async (event_id: string, status: 0 | 1) => {
        const eventData = await update_event({
            event_id: event_id,
            status: status,
        });
        setUserEvents(
            userEvents.map((event) =>
                event.event_id === event_id ? eventData : event,
            ),
        );
    };

    // org methods
    // update org

    return (
        <UserContext.Provider
            value={{
                userData,
                setUserData,
                userChannels,
                setUserChannels,
                userEvents,
                setUserEvents,
                userOrgs,
                setUserOrgs,

                createUser,
                followUser,
                unfollowUser,
                userHasEvent,
                userHasOrg,
                userHasChannel,
                setStreamStatus,
                editBio,
                editProfileImage,
                editChannel,
                uploadVideo,

                editUsername,
                editEmail,
                changePassword,

                setEventStreamingStatus,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
