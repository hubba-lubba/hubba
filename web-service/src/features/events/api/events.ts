import { Event } from '@/features/events/types';
import { getidtoken } from '@/features/auth/api';
import { EVENTS_API_URL } from '@/config';

export const getEvent = async ({ event_id }: { event_id: string }): Promise<Event> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/?event_id=${event_id}`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;
    
    const data = await res.json();
    // verify res
    const event = data.event as Event;
    return event;
}

// TODO: figure out which fields are needed in PUT/PATCH for update and create
export const updateEvent = async (event_id: string, event: Event): Promise<void> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/?event_id=${event_id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ ...event }),
    });

    if (res.status !== 200) throw res;
}

export const createEvent = async (event: Event): Promise<void> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ ...event }),
    });

    if (res.status !== 200) throw res;
}

export const deleteEvent = async (event_id: string): Promise<void> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/?event_id=${event_id}`, {
        method: 'DELETE',
        headers: headers,
    });

    if (res.status !== 200) throw res;
}

export const getUserEvents = async (): Promise<Event[]> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/get_user_events`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    const events = data.events as Event[];
    return events;
};


export const addUserToEvent = async (event_id: string): Promise<void> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/add_user?event_id=${event_id}`, {
        method: 'POST',
        headers: headers,
    });

    if (res.status !== 200) throw res;
}

export const removeUserFromEvent = async (event_id: string): Promise<void> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/delete_user?event_id=${event_id}`, {
        method: 'POST',
        headers: headers,
    });

    if (res.status !== 200) throw res;
}

export const getRandomEvents = async (): Promise<Event[]> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/get_random_events`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    const events = data.events as Event[];
    return events;
}

export const getUpcomingEvents = async (): Promise<Event[]> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/get_upcoming_events`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    const events = data.events as Event[];
    return events;
}

export const getCurrentEvents = async (): Promise<Event[]> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/get_current_events`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    const events = data.events as Event[];
    return events;
}

