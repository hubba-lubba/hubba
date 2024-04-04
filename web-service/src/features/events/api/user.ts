import { getidtoken } from '@/features/auth/api';
import { EVENTS_API_URL } from '@/config';

export const joinEvent = async ({ eventId }: { eventId: string }): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };

    const body = {
        event_id: eventId,
    };

    const res = await fetch(`${EVENTS_API_URL}/join_event`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`join ${JSON.stringify(data)}`);
}

export const leaveEvent = async ({ eventId }: { eventId: string }): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };

    const body = {
        event_id: eventId,
    };

    const res = await fetch(`${EVENTS_API_URL}/leave_event`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`leave ${JSON.stringify(data)}`);
}