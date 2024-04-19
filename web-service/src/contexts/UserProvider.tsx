// user information to load onto webpage: username, profile image, followed streams, events, INBOX

import React, { createContext, useEffect, useState } from 'react';
import { User } from '@/features/users/types';
import { Event } from '@/features/events/types';
import { Org } from '@/features/orgs/types';
import { changepassword } from '@/features/auth/api';
import { createUser, followUser } from '@/features/users/api';

interface UserContextType {
    userData: User;
    setUserData: (user: User) => void;
    usersData: User[];
    setUsersData: (user: User[]) => void;
    userEvents: Event[];
    setUserEvents: (events: Event[]) => void;
    userOrgs: Org[];
    setUserOrgs: (orgs: Org[]) => void;
    
    createUserData: () => Promise<User>;
    
    followUserData: (user_id: string) => Promise<void>;
    
    
    setStreamStatus: (status: 0 | 1) => Promise<void>;
    addEventToUser: (event_id: string) => Promise<void>;
    removeEventFromUser: (event_id: string) => Promise<void>;
    addOrgToUser: (org_id: string, owner?: boolean) => Promise<void>;
    removeOrgFromUser: (org_id: string) => Promise<void>;
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
    const [usersData, setUsersData] = useState<User[]>([]);
    const [userEvents, setUserEvents] = useState<Event[]>([]);
    const [userOrgs, setUserOrgs] = useState<Org[]>([]);

    useEffect(() => {
        console.log('user data', userData);
    }, [userData]);

    const createUserData = async () => {
        const userData = await createUser();
        setUserData(userData);
        return userData;
    };

    // call api function, then update user context
    const followUserData = async (user_id: string) => {
        await followUser(user_id);

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
    
    const setStreamStatus = async (status: 0 | 1) => {
        setUserData({ ...userData, streaming_status: status });
    };
    
    const editBio = async (bio: string) => {
        setUserData({ ...userData, bio: bio });
    };
    
    const editProfileImage = async (profile_image: string) => {
        setUserData({ ...userData, profile_image: profile_image });
    };
    
    const editChannel = async (channel: string) => {
        setUserData({ ...userData, channel: channel });
    };
    
    const editUsername = async (username: string) => {
        setUserData({ ...userData, username: username });
    };

    const editEmail = async (email: string) => {
        // firebase
    };
    // TODO: implement thunmbnails, title
    const uploadVideo = async (video_url: string) => {
        setUserData({
            ...userData,
            video_urls: [...userData.video_urls, video_url],
        });
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
                createUserData,
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
