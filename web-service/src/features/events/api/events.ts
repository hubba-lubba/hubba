import { Event } from '@/features/events/types';
import { getidtoken } from '@/features/auth/api';
import { EVENTS_API_URL } from '@/config';

export const get_event = async (event_id: string): Promise<Event> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${EVENTS_API_URL}/?event_id=${event_id}`, {
        method: 'GET',
        headers: headers,
    });

    const data = await res.json();
    console.log(`get_event ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const event = data.event as Event;
    return event;
};

// TODO: figure out which fields are needed in PUT/PATCH for update and create.
export const create_event = async (event: Event): Promise<Event> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ ...event }),
    });

    const data = await res.json();
    console.log(`create_event ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const new_event = data.event as Event;
    return new_event;
};

export const update_event = async (
    event_id: string,
    event: Event,
): Promise<Event> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/?event_id=${event_id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ ...event }),
    });

    const data = await res.json();
    console.log(`update_event ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const updated_event = data.event as Event;
    return updated_event;
};

export const delete_event = async (event_id: string): Promise<string> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/?event_id=${event_id}`, {
        method: 'DELETE',
        headers: headers,
    });

    const data = await res.json();
    console.log(`delete_event ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const deleted_event_id = data.event_id as string;
    return deleted_event_id;
};

export const get_user_events = async (): Promise<Event[]> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/get_user_events`, {
        method: 'GET',
        headers: headers,
    });

    const data = await res.json();
    console.log(`get_user_events ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const events = data.events as Event[];
    return events;
};

export const add_user_to_event = async (event_id: string): Promise<Event> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/add_user?event_id=${event_id}`, {
        method: 'POST',
        headers: headers,
    });

    const data = await res.json();
    console.log(`add_user_to_event ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const event = data.event as Event;
    return event;
};

export const remove_user_from_event = async (
    event_id: string,
): Promise<string> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(
        `${EVENTS_API_URL}/delete_user?event_id=${event_id}`,
        {
            method: 'POST',
            headers: headers,
        },
    );

    const data = await res.json();
    console.log(`remove_user_from_event ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const deleted_event_id = data.event_id as string;
    return deleted_event_id;
};

export const get_random_events = async (): Promise<Event[]> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${EVENTS_API_URL}/get_random_events`, {
        method: 'GET',
        headers: headers,
    });

    const data = await res.json();
    console.log(`get_random_events ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    console.log(data);
    const events = data.events as Event[];
    return events;
};

export const get_upcoming_events = async (): Promise<Event[]> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${EVENTS_API_URL}/get_upcoming_events`, {
        method: 'GET',
        headers: headers,
    });

    const data = await res.json();
    console.log(`get_upcoming_events ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const events = data.events as Event[];
    return events;
};

export const get_current_events = async (): Promise<Event[]> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${EVENTS_API_URL}/get_current_events`, {
        method: 'GET',
        headers: headers,
    });

    const data = await res.json();
    console.log(`get_current_events ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const events = data.events as Event[];
    return events;
};
