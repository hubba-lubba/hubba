import { User } from '../types';
import { getidtoken } from '@/features/auth/api';
import { USER_API_URL } from '@/config';


export const createUser = async ({
    username,
}: {
    username: string;
}): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };
    const body = {
        username: username,
    };
    const res = await fetch(`${USER_API_URL}/`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`create ${JSON.stringify(data)}`);
};

export const getCurrentUser = async (): Promise<User> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };
    const res = await fetch(`${USER_API_URL}/get_current_user`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    const userData = data.user as User;
    const user = new User(userData.user_id, userData.username, userData.email);
    return user;
};

export const getUser = async ({ id }: { id: string }): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${USER_API_URL}?user_id=${id}`, {
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

export const followUser = async ({ id }: { id: string }): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };

    const body = {
        user_id: id,
    };

    const res = await fetch(`${USER_API_URL}/follow`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`follow ${JSON.stringify(data)}`);
}

export const unfollowUser = async ({ id }: { id: string }): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };

    const body = {
        user_id: id,
    };

    const res = await fetch(`${USER_API_URL}/unfollow`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`unfollow ${JSON.stringify(data)}`);
}