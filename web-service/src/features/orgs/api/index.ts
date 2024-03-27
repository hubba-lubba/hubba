// make users just a string of userid later
import { getUser } from '@/features/users/api';
import { User } from '@/features/users/types';
import { Org } from '../types';

export const getSidebarOrgs = async (user: User): Promise<Org[]> => {
    const data = Promise.all(
        user.joined_orgs.map(async (id) => (await getOrg(id)).org),
    );
    return data;
};

export const getOrg = async (id: string): Promise<{ org: Org }> => {
    const data = {
        org: {
            id: id,
            name: `org ${id}`,
            image: 'https://via.placeholder.com/250',
            description:
                'org1 description. \n join us at https://www.google.com!',
            owner: 'org1 owner',
            moderators: ['mod1', 'mod2'],
            users: [
                (await getUser('user_1')).user,
                (await getUser('user_2')).user,
                (await getUser('jackey')).user,
            ],
            events: ['event1', 'event2'],
        },
    };
    return data;
};
