import { User } from '@/features/users/types';
import { Org } from '../types';

export const getSidebarOrgs = async (user: User): Promise<Org[]> => {
    const data = Promise.all(
        user.joined_orgs.map(async (id) => (await getMockOrg(id)).org),
    );
    return data;
};

export const getMockOrg = async (id: string): Promise<{ org: Org }> => {
    const data = {
        org: {
            org_id: id,
            name: `org ${id}`,
            image: 'https://via.placeholder.com/250',
            description:
                'org1 description. \n join us at https://www.google.com!',
            owner: 'org1 owner',
            moderators: ['mod1', 'mod2'],
            users: ['user1', 'user2', 'user3'],
            events: ['event1', 'event2'],
            created: new Date(),
        },
    };
    return data;
};
