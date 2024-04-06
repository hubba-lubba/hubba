// user information to load onto webpage: username, profile image, followed streams, events, INBOX

import React, { createContext, useState } from 'react';
import { User } from '@/features/users/types';
import { changepassword } from '@/features/auth/api';

interface UserContextType {
    userData: User;
    setUserData: (user: User) => void;
    setStreamStatus: (status: 0 | 1) => void;
    joinEvent: (event_id: string) => void;
    leaveEvent: (event_id: string) => void;
    joinOrg: (org_id: string) => void;
    leaveOrg: (org_id: string) => void;
    followUser: (user_id: string) => void;
    unfollowUser: (user_id: string) => void;
    uploadVideo: (video_url: string) => void;
    editUsername: (username: string) => void;
    editBio: (bio: string) => void;
    editProfileImage: (profile_image: string) => void;
    editEmail: (email: string) => void;
    editChannel: (channel: string) => void;
    changePassword: (password: string, newPassword: string) => void;
}

export const UserContext = createContext<UserContextType>(null!);

export const UserProvider = ({ children }: React.PropsWithChildren<object>) => {
    const [userData, setUserData] = useState<User>(null!);

    const setStreamStatus = (status: 0 | 1) => {
        setUserData({ ...userData, streaming_status: status });
    };

    const joinEvent = (event_id: string) => {
        setUserData({
            ...userData,
            joined_events: [...userData.joined_events, event_id],
        });
    };

    const leaveEvent = (event_id: string) => {
        setUserData({
            ...userData,
            joined_events: userData.joined_events.filter(
                (id) => id !== event_id,
            ),
        });
    };

    const joinOrg = (org_id: string) => {
        setUserData({
            ...userData,
            joined_orgs: [...userData.joined_orgs, org_id],
        });
    };

    const leaveOrg = (org_id: string) => {
        setUserData({
            ...userData,
            joined_orgs: userData.joined_orgs.filter((id) => id !== org_id),
        });
    };

    const followUser = (user_id: string) => {
        setUserData({
            ...userData,
            following: [...userData.following, user_id],
        });
    };

    const unfollowUser = (user_id: string) => {
        setUserData({
            ...userData,
            following: userData.following.filter((id) => id !== user_id),
        });
    };

    // TODO: implement thunmbnails, title
    const uploadVideo = (video_url: string) => {
        setUserData({
            ...userData,
            video_urls: [...userData.video_urls, video_url],
        });
    };

    const editUsername = (username: string) => {
        setUserData({ ...userData, username: username });
    };

    const editBio = (bio: string) => {
        setUserData({ ...userData, bio: bio });
    };

    const editProfileImage = (profile_image: string) => {
        setUserData({ ...userData, profile_image: profile_image });
    };

    const editEmail = (email: string) => {
        setUserData({ ...userData, email: email });
    };

    const editChannel = (channel: string) => {
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
                setUserData,
                setStreamStatus,
                joinEvent,
                leaveEvent,
                joinOrg,
                leaveOrg,
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
