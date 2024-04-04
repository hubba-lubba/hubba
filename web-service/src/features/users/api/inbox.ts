import { Message } from '../types';
import { getidtoken } from '@/features/auth/api';
import { USER_API_URL } from '@/config';

export const getInbox = async (): Promise<Message[]> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };
    const res = await fetch(`${USER_API_URL}/get_inbox`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    const messages = data.messages as Message[];
    return messages;
};

export const sendMessage = async ({
    recipient,
    subject,
    content,
    timestamp = new Date(),
}: {
    recipient: string;
    subject: string;
    content: string;
    timestamp?: Date;
}): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };
    const body = {
        recipient: recipient,
        subject: subject,
        content: content,
        timestamp: timestamp,
    };
    const res = await fetch(`${USER_API_URL}/send_message`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`send ${JSON.stringify(data)}`);
};

export const readMessage = async ({
    message_id,
}: {
    message_id: string;
}): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };
    const body = {
        message_id: message_id,
    };
    const res = await fetch(`${USER_API_URL}/read_message`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`read ${JSON.stringify(data)}`);
};
