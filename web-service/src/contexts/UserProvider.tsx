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
import { get_owned_organizations, get_user_orgs } from '@/features/orgs/api';
import {
    get_org_events,
    get_user_events,
    update_event,
} from '@/features/events/api';
import { editemail, editpassword, editusername } from '@/lib/auth';
import { update_org } from '@/features/orgs/api';
import { logger } from '@/utils/logger';

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
    editEventName: (event_id: string, name: string) => Promise<void>;
    editEventThumbnail: (event_id: string, thumbnail: string) => Promise<void>;
    editEventDesc: (event_id: string, desc: string) => Promise<void>;
    editEventUrl: (event_id: string, url: string) => Promise<void>;
    editEventTime: (event_id: string, time_of: Date) => Promise<void>;
    editEventPrizes: (event_id: string, prizes: string[]) => Promise<void>;

    editOrgName: (org_id: string, name: string) => Promise<void>;
    editOrgImage: (org_id: string, image: string) => Promise<void>;
    editOrgChannel: (org_id: string, channel: string) => Promise<void>;
    editOrgDesc: (org_id: string, desc: string) => Promise<void>;
}

export const UserContext = createContext<UserContextType>(null!);

export const UserProvider = ({ children }: React.PropsWithChildren<object>) => {
    const [userData, setUserData] = useState<User>(null!);
    const [userChannels, setUserChannels] = useState<User[]>([]);
    const [userEvents, setUserEvents] = useState<Event[]>([]);
    const [userOrgs, setUserOrgs] = useState<Org[]>([]);

    useEffect(() => {
        logger(`user data ${JSON.stringify(userData)}`);
        const fetchData = async () => {
            const channels = await Promise.all(
                userData.following.map((user_id) => get_user(user_id)),
            );
            setUserChannels(channels);
            const orgs = await get_user_orgs();
            setUserOrgs(orgs);

            const joined_events = await get_user_events();
            const owned_events = await getOwnedEvents();
            const events = [...joined_events, ...owned_events];
            setUserEvents(events);
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
        setUserChannels([...userChannels, user]);
    };
    const unfollowUser = async (user_id: string) => {
        const user = await unfollow_user(user_id);
        setUserData(user);
        setUserChannels(
            userChannels.filter((channel) => channel.user_id !== user_id),
        );
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
        const user = await update_user({ username: username });
        setUserData(user);
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
    const editEventName = async (event_id: string, name: string) => {
        const eventData = await update_event({
            event_id: event_id,
            name: name,
        });
        setUserEvents(
            userEvents.map((event) =>
                event.event_id === event_id ? eventData : event,
            ),
        );
    };
    const editEventThumbnail = async (event_id: string, thumbnail: string) => {
        const eventData = await update_event({
            event_id: event_id,
            thumbnail: thumbnail,
        });
        setUserEvents(
            userEvents.map((event) =>
                event.event_id === event_id ? eventData : event,
            ),
        );
    };
    const editEventDesc = async (event_id: string, description: string) => {
        const eventData = await update_event({
            event_id: event_id,
            description: description,
        });
        setUserEvents(
            userEvents.map((event) =>
                event.event_id === event_id ? eventData : event,
            ),
        );
    };
    const editEventUrl = async (event_id: string, url: string) => {
        const eventData = await update_event({
            event_id: event_id,
            url: url,
        });
        setUserEvents(
            userEvents.map((event) =>
                event.event_id === event_id ? eventData : event,
            ),
        );
    };
    const editEventTime = async (event_id: string, time_of: Date) => {
        const eventData = await update_event({
            event_id: event_id,
            time_of: time_of,
        });
        setUserEvents(
            userEvents.map((event) =>
                event.event_id === event_id ? eventData : event,
            ),
        );
    };
    const editEventPrizes = async (event_id: string, prizes: string[]) => {
        const eventData = await update_event({
            event_id: event_id,
            prizes: prizes,
        });
        setUserEvents(
            userEvents.map((event) =>
                event.event_id === event_id ? eventData : event,
            ),
        );
    };
    const getOwnedEvents = async () => {
        const ownedOrgs = await get_owned_organizations();
        const org_owned_events = await Promise.all(
            ownedOrgs.map(async (org) => {
                return await get_org_events(org.org_id);
            }),
        );
        return org_owned_events.flat();
    };

    // org methods
    const editOrgName = async (org_id: string, name: string) => {
        const orgData = await update_org({ org_id: org_id, name: name });
        setUserOrgs(
            userOrgs.map((org) => (org.org_id === org_id ? orgData : org)),
        );
    };
    const editOrgImage = async (org_id: string, image: string) => {
        const orgData = await update_org({ org_id: org_id, image: image });
        setUserOrgs(
            userOrgs.map((org) => (org.org_id === org_id ? orgData : org)),
        );
    };
    const editOrgChannel = async (org_id: string, channel: string) => {
        const orgData = await update_org({ org_id: org_id, channel: channel });
        setUserOrgs(
            userOrgs.map((org) => (org.org_id === org_id ? orgData : org)),
        );
    };
    const editOrgDesc = async (org_id: string, desc: string) => {
        const orgData = await update_org({ org_id: org_id, description: desc });
        setUserOrgs(
            userOrgs.map((org) => (org.org_id === org_id ? orgData : org)),
        );
    };

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
                editEventName,
                editEventThumbnail,
                editEventDesc,
                editEventUrl,
                editEventTime,
                editEventPrizes,

                editOrgName,
                editOrgImage,
                editOrgChannel,
                editOrgDesc,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
