import { getidtoken } from '@/features/auth/api';
import { Org } from '@/features/orgs/types';
import { ORGS_API_URL } from '@/config';
import { logger } from '@/utils/logger';

type OrgServiceType = {
    organization_id: string;
    name: string;
    image: string;
    description: string;
    owner: string;
    users: string[];
    channel: string;
};

const extort = (orgData: OrgServiceType): Org => {
    return new Org(
        orgData.organization_id,
        orgData.name,
        orgData.image,
        orgData.description,
        orgData.channel,
        orgData.owner,
        orgData.users,
    );
};

const extort_many = (orgsData: OrgServiceType[]): Org[] => {
    return orgsData.map((orgData) => {
        return extort(orgData);
    });
};

export const get_org = async (org_id: string): Promise<Org> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${ORGS_API_URL}/?organization_id=${org_id}`, {
        method: 'GET',
        headers: headers,
    });

    logger(`get_org`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const orgData = data.organization as OrgServiceType;
        console.log(orgData);
        const org = extort(orgData);
        console.log(org);
        return org;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const create_org = async (
    name: string,
    description?: string,
    channel?: string,
): Promise<Org> => {
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

    logger(`create_org`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const orgData = data.organization as OrgServiceType;
        const org = extort(orgData);
        return org;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const update_org = async ({
    org_id,
    name,
    image,
    description,
    channel,
}: {
    org_id: string;
    name?: string;
    image?: string;
    description?: string;
    channel?: string;
}): Promise<Org> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const body = {
        name: name,
        image: image,
        description: description,
        channel: channel,
    };
    const res = await fetch(`${ORGS_API_URL}/?organization_id=${org_id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body),
    });

    logger(`update_org ${JSON.stringify(body)}`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const orgData = data.organization as OrgServiceType;
        const org = extort(orgData);
        return org;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const delete_org = async (org_id: string): Promise<string> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${ORGS_API_URL}/?organization_id=${org_id}`, {
        method: 'DELETE',
        headers: headers,
    });

    logger(`delete_org`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const deleted_org_id = data.organization_id as string;
        return deleted_org_id;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
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

    logger(`get_user_orgs`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const orgsData = data.organizations as OrgServiceType[];
        const orgs = extort_many(orgsData);
        return orgs;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const get_owned_organizations = async (): Promise<Org[]> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${ORGS_API_URL}/get_owned_organizations`, {
        method: 'GET',
        headers: headers,
    });

    logger(`get_owned_organizations`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const orgsData = data.organizations as OrgServiceType[];
        const orgs = extort_many(orgsData);
        return orgs;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
}

export const add_user_to_org = async (org_id: string): Promise<Org> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(
        `${ORGS_API_URL}/add_user?organization_id=${org_id}`,
        {
            method: 'PATCH',
            headers: headers,
        },
    );

    logger(`add_user_to_org`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const orgData = data.organization as OrgServiceType;
        const org = extort(orgData);
        return org;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const remove_user_from_org = async (org_id: string): Promise<Org> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(
        `${ORGS_API_URL}/delete_user?organization_id=${org_id}`,
        {
            method: 'PATCH',
            headers: headers,
        },
    );

    logger(`remove_user_from_org`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const orgData = data.organization as OrgServiceType;
        const org = extort(orgData);
        return org;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const get_random_orgs = async (): Promise<Org[]> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${ORGS_API_URL}/get_random_organizations`, {
        method: 'GET',
        headers: headers,
    });

    logger(`get_random_orgs`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const orgsData = data.organizations as OrgServiceType[];
        const orgs = extort_many(orgsData);
        return orgs;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};
