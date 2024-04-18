import { User } from '../types';
import { getidtoken } from '@/features/auth/api';
import { USER_API_URL } from '@/config';

// TODO: remove username as a field
export const createUser = async (): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${USER_API_URL}/`, {
        method: 'PUT',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`create ${JSON.stringify(data)}`);
    return data as User;
};

export const getCurrentUser = async (): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${USER_API_URL}/get_current_user`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    const userData = data.user as User;
    // TODO: revise?
    const user = new User(userData.user_id, userData.username);
    return user;
};

export const getUser = async (user_id: string): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${USER_API_URL}?user_id=${user_id}`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`get ${JSON.stringify(data)}`);
    const userData = data.user;
    const user = new User(userData.user_id, userData.username, userData.email);
    return user;
};

export const followUser = async (user_id: string): Promise<void> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };

    const body = {
        user_id: user_id,
    };

    const res = await fetch(`${USER_API_URL}/follow`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`follow ${JSON.stringify(data)}`);
};

export const unfollowUser = async (user_id: string): Promise<void> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };

    const body = {
        user_id: user_id,
    };

    const res = await fetch(`${USER_API_URL}/unfollow`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`unfollow ${JSON.stringify(data)}`);
};

export const updateUser = async (user: User): Promise<void> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };

    const body = {
        ...user,
    };

    const res = await fetch(`${USER_API_URL}/`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`update ${JSON.stringify(data)}`);
};

export const addVideo = async (video_url: string): Promise<void> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };

    const res = await fetch(`${USER_API_URL}/add_video`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ video_url }),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`add video ${JSON.stringify(data)}`);
};
