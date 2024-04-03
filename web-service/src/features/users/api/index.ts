import { User } from '../classes';
import { getidtoken } from '@/features/auth/api';
import { getAuth } from 'firebase/auth';
import { USER_API_URL } from '@/config';

export const createUserData = async ({
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

export const getCurrentUserData = async (): Promise<User> => {
    const idToken = await getidtoken();
    const auth = getAuth();
    const id = auth.currentUser?.uid;

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };
    // TODO: remove id query param in future (backend problem)
    const res = await fetch(`${USER_API_URL}/?user_id=${id}`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();

    // verify res
    console.log(`get ${JSON.stringify(data)}`);

    const userData = data.user;
    userData['email'] = 'poop@gmail.com';

    console.log(new User(...userData));
    return userData;
};

export const getUserData = async ({ id }: { id: string }): Promise<User> => {
    // TODO: remove need for idToken in future (backend problem)
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
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
