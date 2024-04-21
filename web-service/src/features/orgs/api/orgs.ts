import { getidtoken } from '@/features/auth/api';
import { Org } from '@/features/orgs/types';
import { ORGS_API_URL } from '@/config';

export const get_org = async (org_id: string): Promise<Org> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${ORGS_API_URL}/?org_id=${org_id}`, {
        method: 'GET',
        headers: headers,
    });

    const data = await res.json();
    console.log(`get_org ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const org = data.org as Org;
    return org;
};

export const create_org = async (name: string, description?: string, channel?: string): Promise<Org> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const body = {
        name: name,
        description: description,
        channel: channel,
    };
    const res = await fetch(`${ORGS_API_URL}/`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log(`create_org ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const new_org = data.org as Org;
    return new_org;
};

// TODO: set specific fields for update
export const update_org = async (org_id: string, org: Org): Promise<Org> => {
    const { name, description, channel, image } = org;
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const body = {
        name: name,
        description: description,
        channel: channel,
        image: image,
    };
    const res = await fetch(`${ORGS_API_URL}/?org_id=${org_id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log(`update_org ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const updated_org = data.org as Org;
    return updated_org;
};

export const delete_org = async (org_id: string): Promise<string> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${ORGS_API_URL}/?org_id=${org_id}`, {
        method: 'DELETE',
        headers: headers,
    });

    const data = await res.json();
    console.log(`delete_org ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const deleted_org_id = data.org_id as string;
    return deleted_org_id;
};

export const get_user_orgs = async (): Promise<Org[]> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${ORGS_API_URL}/get_user_organizations`, {
        method: 'GET',
        headers: headers,
    });

    const data = await res.json();
    console.log(`get_user_orgs ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const orgs = data.orgs as Org[];
    return orgs;
};

export const add_user_to_org = async (org_id: string): Promise<Org> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${ORGS_API_URL}/add_user?org_id=${org_id}`, {
        method: 'PUT',
        headers: headers,
    });

    const data = await res.json();
    console.log(`add_user_to_org ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const org = data.org as Org;
    return org;
};

export const remove_user_from_org = async (org_id: string): Promise<string> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${ORGS_API_URL}/delete_user?org_id=${org_id}`, {
        method: 'DELETE',
        headers: headers,
    });

    const data = await res.json();
    console.log(`remove_user_from_org ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const deleted_org_id = data.org_id as string;
    return deleted_org_id;
};

export const get_random_orgs = async (): Promise<Org[]> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${ORGS_API_URL}/get_random_organizations`, {
        method: 'GET',
        headers: headers,
    });

    const data = await res.json();
    console.log(`get_random_orgs ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const orgs = data.orgs as Org[];
    return orgs;
};
