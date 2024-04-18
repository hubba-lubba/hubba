import { getidtoken } from '@/features/auth/api';
import { Org } from '@/features/orgs/types';
import { ORGS_API_URL } from '@/config';

export const getOrg = async ({ org_id }: { org_id: string }): Promise<Org> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${ORGS_API_URL}/?org_id=${org_id}`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    const org = data.org as Org;
    return org;
};

// TODO: set specific fields for create and update
export const createOrg = async (org: Org): Promise<void> => {
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
}

export const updateOrg = async (org_id: string, org: Org): Promise<void> => {
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
}

export const deleteOrg = async (org_id: string): Promise<void> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${ORGS_API_URL}/?org_id=${org_id}`, {
        method: 'DELETE',
        headers: headers,
    });

    if (res.status !== 200) throw res;
}

export const getUserOrgs = async (): Promise<Org[]> => {
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

export const addUserToOrg = async (org_id: string): Promise<void> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${ORGS_API_URL}/add_user?org_id=${org_id}`, {
        method: 'PUT',
        headers: headers,
    });

    if (res.status !== 200) throw res;
}

export const removeUserFromOrg = async (org_id: string): Promise<void> => {
    const headers = {
        'Content-Type': 'application/json',
        'id_token': await getidtoken(),
    };
    const res = await fetch(`${ORGS_API_URL}/delete_user?org_id=${org_id}`, {
        method: 'DELETE',
        headers: headers,
    });

    if (res.status !== 200) throw res;
}

export const getRandomOrgs = async (): Promise<Org[]> => {
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

// get orgs by query (discover, etc)
