import { User } from '@/features/users/types';
import { Org } from '@/features/orgs/types';
import { USER_API_URL } from '@/config';

export const getOrg = async ({ org_id }: { org_id: string }): Promise<Org> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${USER_API_URL}/?org_id=${org_id}`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    const org = data.org as Org;
    return org;
};

export const getUserOrgs = async (user: User): Promise<Org[]> => {
    const data = Promise.all(
        user.joined_orgs.map(
            async (id: string) => await getOrg({ org_id: id }),
        ),
    );
    return data;
};

// get orgs by query (discover, etc)
