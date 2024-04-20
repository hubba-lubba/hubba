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

    if (res.status !== 200) throw res;

    const data = await res.json();
    const org = data.org as Org;
    return org;
};

// TODO: set specific fields for create and update
export const create_org = async (org: Org): Promise<Org> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${ORGS_API_URL}/`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ ...org }),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    const new_org = data.org as Org;
    return new_org;
}

export const update_org = async (org_id: string, org: Org): Promise<Org> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${ORGS_API_URL}/?org_id=${org_id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ ...org }),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    const updated_org = data.org as Org;
    return updated_org;
}

export const delete_org = async (org_id: string): Promise<string> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${ORGS_API_URL}/?org_id=${org_id}`, {
        method: 'DELETE',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    const deleted_org_id = data.org_id as string;
    return deleted_org_id;
}

export const get_user_orgs = async (): Promise<Org[]> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${ORGS_API_URL}/get_user_organizations`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    const orgs = data.orgs as Org[];
    return orgs;
};

export const add_user_to_org = async (org_id: string): Promise<Org> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${ORGS_API_URL}/add_user?org_id=${org_id}`, {
        method: 'PUT',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    const org = data.org as Org;
    return org;
}

export const remove_user_from_org = async (org_id: string): Promise<string> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${ORGS_API_URL}/delete_user?org_id=${org_id}`, {
        method: 'DELETE',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    const deleted_org_id = data.org_id as string;
    return deleted_org_id;
}

export const get_random_orgs = async (): Promise<Org[]> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${ORGS_API_URL}/get_random_organizations`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;
    const data = await res.json();
    const orgs = data.orgs as Org[];
    return orgs;
}
