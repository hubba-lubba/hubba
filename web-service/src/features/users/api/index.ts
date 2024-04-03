import { User } from '../classes';
import { getidtoken } from '@/features/auth/api';
import { getAuth } from 'firebase/auth';
import { USER_API_URL } from '@/config';

export const createUserData = async (): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };

    const res = await fetch(`${USER_API_URL}/`, {
        method: 'POST',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();

    // verify res
    console.log(`create ${JSON.stringify(data)}`);
};

export const getCurrentUserData = async (): Promise<User> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };
    const res = await fetch(`${USER_API_URL}/`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();

    // verify res
    console.log(`get ${JSON.stringify(data)}`);

    const userData = data.user;
    console.log(userData);
    return userData;
};

export const getUserData = async ({ id }: { id?: string }): Promise<User> => {
    const auth = getAuth();
    if (!id) id = auth.currentUser?.uid;

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
    console.log(userData);
    return userData;
};

export * from './mock';
