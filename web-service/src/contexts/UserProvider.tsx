// user information to load onto webpage: username, profile image, followed streams, events, INBOX

import React, { createContext, useEffect, useState } from 'react';
import { User } from '@/features/users/types';
import { changepassword } from '@/features/auth/api';

interface UserContextType {
    userData: User;
    createUser: (id: string, username: string, email: string) => Promise<User>;
    setUserData: (user: User) => void;
    setStreamStatus: (status: 0 | 1) => Promise<void>;
    addEventToUser: (event_id: string) => Promise<void>;
    removeEventFromUser: (event_id: string) => Promise<void>;
    addOrgToUser: (org_id: string, owner?: boolean) => Promise<void>;
    removeOrgFromUser: (org_id: string) => Promise<void>;
    followUser: (user_id: string) => Promise<void>;
    unfollowUser: (user_id: string) => Promise<void>;
    uploadVideo: (video_url: string) => Promise<void>;
    editUsername: (username: string) => Promise<void>;
    editBio: (bio: string) => Promise<void>;
    editProfileImage: (profile_image: string) => Promise<void>;
    editEmail: (email: string) => Promise<void>;
    editChannel: (channel: string) => Promise<void>;
    changePassword: (password: string, newPassword: string) => Promise<void>;
}

export const UserContext = createContext<UserContextType>(null!);

export const UserProvider = ({ children }: React.PropsWithChildren<object>) => {
    const [userData, setUserData] = useState<User>(null!);

    const createUser = async (id: string, username: string, email: string) => {
        const user = new User(
            id,
            username,
            email,
            undefined,
            '',
            [],
            [],
            0,
            '',
            [],
            [],
            [],
            [],
            [],
        );
        return user;
    };

    useEffect(() => {
        console.log('user data', userData);
    }, [userData]);

    const setStreamStatus = async (status: 0 | 1) => {
        setUserData({ ...userData, streaming_status: status });
    };

    const addEventToUser = async (event_id: string) => {
        console.log('adding event to user', event_id);
        setUserData({
            ...userData,
            joined_events: [...userData.joined_events, event_id],
        });
    };

    const removeEventFromUser = async (event_id: string) => {
        console.log('removing event from user', event_id);
        setUserData({
            ...userData,
            joined_events: userData.joined_events.filter(
                (id) => id !== event_id,
            ),
        });
    };

    const addOrgToUser = async (org_id: string, owner: boolean = false) => {
        console.log('adding org to user', org_id);
        setUserData({
            ...userData,
            joined_orgs: [...userData.joined_orgs, org_id],
            owned_orgs: owner
                ? [...userData.owned_orgs, org_id]
                : userData.owned_orgs,
        });
    };

    const removeOrgFromUser = async (org_id: string) => {
        console.log('removing org from user', org_id);
        setUserData({
            ...userData,
            joined_orgs: userData.joined_orgs.filter((id) => id !== org_id),
        });
    };

    const followUser = async (user_id: string) => {
        setUserData({
            ...userData,
            following: [...userData.following, user_id],
        });
    };

    const unfollowUser = async (user_id: string) => {
        setUserData({
            ...userData,
            following: userData.following.filter((id) => id !== user_id),
        });
    };

    // TODO: implement thunmbnails, title
    const uploadVideo = async (video_url: string) => {
        setUserData({
            ...userData,
            video_urls: [...userData.video_urls, video_url],
        });
    };

    const editUsername = async (username: string) => {
        setUserData({ ...userData, username: username });
    };

    const editBio = async (bio: string) => {
        setUserData({ ...userData, bio: bio });
    };

    const editProfileImage = async (profile_image: string) => {
        setUserData({ ...userData, profile_image: profile_image });
    };

    const editEmail = async (email: string) => {
        setUserData({ ...userData, email: email });
    };

    const editChannel = async (channel: string) => {
        setUserData({ ...userData, channel: channel });
    };

    const changePassword = async (password: string, newPassword: string) => {
        await changepassword(userData.email, password, newPassword);
    };

    // remove video

    return (
        <UserContext.Provider
            value={{
                userData,
                createUser,
                setUserData,
                setStreamStatus,
                addEventToUser,
                removeEventFromUser,
                addOrgToUser,
                removeOrgFromUser,
                followUser,
                unfollowUser,
                uploadVideo,
                editUsername,
                editBio,
                editProfileImage,
                editEmail,
                editChannel,
                changePassword,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
