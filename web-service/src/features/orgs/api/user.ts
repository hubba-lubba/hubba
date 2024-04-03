import { getidtoken } from '@/features/auth/api';
import { ORGS_API_URL } from '@/config';

export const joinOrg = async ({ orgId }: { orgId: string }): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };

    const body = {
        org_id: orgId,
    };

    const res = await fetch(`${ORGS_API_URL}/join_org`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`join ${JSON.stringify(data)}`);
};

export const leaveOrg = async ({ orgId }: { orgId: string }): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };

    const body = {
        org_id: orgId,
    };

    const res = await fetch(`${ORGS_API_URL}/leave_org`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`leave ${JSON.stringify(data)}`);
};