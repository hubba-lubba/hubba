import { User } from '../types';
import { getidtoken } from '@/features/auth/api';
import { USER_API_URL } from '@/config';

export const createUserData = async (): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
    };

    const res = await fetch(`${USER_API_URL}/user/`, {
        method: 'POST',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();

    // verify res
    console.log(`create ${JSON.stringify(data)}`);
};

export const getUserData = async (): Promise<User> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
    };
    const res = await fetch(`${USER_API_URL}/user/`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();

    // verify res
    console.log(`get ${JSON.stringify(data)}`);

    const userData = data.user;
    return userData;
};

export * from './mock';
