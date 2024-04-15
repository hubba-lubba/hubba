import { getidtoken } from '@/features/auth/api';
import { getAuth } from "firebase/auth"
import { EVENTS_API_URL } from '@/config';

export const joinEvent = async ({ eventId }: { eventId: string }): Promise<void> => {
    const idToken = await getidtoken();
    const auth = getAuth()

    if (!auth.currentUser)
        throw new Error("@/features/events/api/user.ts joinEvent: user not authenticated")

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };

    const body = {
        event_id: eventId,
        user_id: auth.currentUser.uid
    };

    const res = await fetch(`${EVENTS_API_URL}/join_event`, {
        method: 'POST',
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
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`leave ${JSON.stringify(data)}`);
}
