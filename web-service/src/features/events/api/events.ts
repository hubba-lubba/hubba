import { User } from '@/features/users/types';
import { Event } from '@/features/events/types';
import { USER_API_URL } from '@/config';

export const getEvent = async ({ event_id }: { event_id: string }): Promise<Event> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${USER_API_URL}/?event_id=${event_id}`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    const event = data.event as Event;
    return event;
}

export const getUserEvents = async (user: User): Promise<Event[]> => {
    const data = Promise.all(
        user.joined_events.map(
            async (id: string) => await getEvent({ event_id: id }),
        ),
    );
    return data;
};

// get events by query (current, upcoming, discover, etc)