import { Event } from '@/features/events/types';
import { getidtoken } from '@/features/auth/api';
import { EVENTS_API_URL } from '@/config';
import { logger } from '@/utils/logger';

type EventServiceType = {
    event_id: string;
    name: string;
    thumbnail: string;
    description: string;
    url: string;
    time_of: Date;
    host_id: string;
    attendees: string[];
    status: 0 | 1;
    prizes: string[];
};

const extort = (eventData: EventServiceType): Event => {
    return new Event(
        eventData.event_id,
        eventData.host_id,
        eventData.name,
        eventData.thumbnail,
        eventData.description,
        eventData.url,
        eventData.time_of,
        eventData.status,
        eventData.prizes,
        eventData.attendees,
    );
};

const extort_many = (eventsData: EventServiceType[]): Event[] => {
    return eventsData.map((eventData) => {
        return extort(eventData);
    });
};

export const get_event = async (event_id: string): Promise<Event> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${EVENTS_API_URL}/?event_id=${event_id}`, {
        method: 'GET',
        headers: headers,
    });

    logger(`get_event`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const eventData = data.event as EventServiceType;
        const event = extort(eventData);
        return event;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const get_org_events = async (org_id: string): Promise<Event[]> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(
        `${EVENTS_API_URL}/get_organization_events?organization_id=${org_id}`,
        {
            method: 'GET',
            headers: headers,
        },
    );

    logger(`get_org_events`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const eventsData = data.events as EventServiceType[];
        const events = extort_many(eventsData);
        return events;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const create_event = async (
    name: string,
    host_org: string,
    time_of: Date,
    description?: string,
    url?: string,
    prizes?: string[],
): Promise<Event> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const body = {
        name: name,
        host_org: host_org,
        description: description,
        url: url,
        time_of: time_of,
        prizes: prizes,
    };
    const res = await fetch(`${EVENTS_API_URL}/`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    logger(`create_event`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const eventData = data.event as EventServiceType;
        const event = extort(eventData);
        return event;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const update_event = async ({
    event_id,
    name,
    thumbnail,
    description,
    url,
    time_of,
    status,
    prizes,
}: {
    event_id: string;
    name?: string;
    thumbnail?: string;
    description?: string;
    url?: string;
    time_of?: Date;
    status?: 0 | 1;
    prizes?: string[];
}): Promise<Event> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const body = {
        name: name,
        thumbnail: thumbnail,
        description: description,
        url: url,
        time_of: time_of,
        status: status,
        prizes: prizes,
    };
    const res = await fetch(`${EVENTS_API_URL}/?event_id=${event_id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body),
    });

    logger(`update_event ${JSON.stringify(body)}`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const eventData = data.event as EventServiceType;
        const event = extort(eventData);
        return event;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
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

    logger(`delete_event`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const deleted_event_id = data.event_id as string;
        return deleted_event_id;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
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

    logger(`get_user_events`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const eventsData = data.events as EventServiceType[];
        const events = extort_many(eventsData);
        return events;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const add_user_to_event = async (event_id: string): Promise<Event> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${EVENTS_API_URL}/add_user?event_id=${event_id}`, {
        method: 'PATCH',
        headers: headers,
    });

    logger(`add_user_to_event`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const eventData = data.event as EventServiceType;
        const event = extort(eventData);
        return event;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const remove_user_from_event = async (
    event_id: string,
): Promise<Event> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(
        `${EVENTS_API_URL}/delete_user?event_id=${event_id}`,
        {
            method: 'PATCH',
            headers: headers,
        },
    );

    logger(`remove_user_from_event`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const eventData = data.event as EventServiceType;
        const event = extort(eventData);
        return event;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const get_random_events = async (): Promise<Event[]> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${EVENTS_API_URL}/get_random_events`, {
        method: 'GET',
        headers: headers,
    });

    logger(`get_random_events`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const eventsData = data.events as EventServiceType[];
        const events = extort_many(eventsData);
        return events;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const get_upcoming_events = async (): Promise<Event[]> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${EVENTS_API_URL}/get_upcoming_events`, {
        method: 'GET',
        headers: headers,
    });

    logger(`get_upcoming_events`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const eventsData = data.events as EventServiceType[];
        const events = extort_many(eventsData);
        return events;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const get_current_events = async (): Promise<Event[]> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${EVENTS_API_URL}/get_current_events`, {
        method: 'GET',
        headers: headers,
    });

    logger(`get_current_events`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const eventsData = data.events as EventServiceType[];
        const events = extort_many(eventsData);
        return events;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};
