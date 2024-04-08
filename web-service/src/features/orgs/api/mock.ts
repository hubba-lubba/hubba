import { User } from '@/features/users/types';
import { Org } from '../types';

export const getSidebarOrgs = async (user: User): Promise<Org[]> => {
    const data = Promise.all(
        user.joined_orgs.map(
            async (id) => (await getMockOrg(id, 'caseoh_')).org,
        ),
    );
    return data;
};

export const getMockOrg = async (
    id: string,
    channel: string,
): Promise<{ org: Org }> => {
    const data = {
        org: {
            org_id: id,
            name: `org ${id}`,
            image: 'https://via.placeholder.com/250',
            description:
                'org1 description. \n join us at https://www.google.com!',
            channel: channel,
            tags: ['tag1', 'tag2', 'tag3'],
            owner: 'org1 owner',
            moderators: ['mod1', 'mod2'],
            users: ['user1', 'user2', 'user3'],
            events: ['event1', 'event2'],
            created: new Date(),
        },
    };
    return data;
};

export const getDiscoverOrgs = async (): Promise<{ orgs: Org[] }> => {
    const data = {
        orgs: [
            (await getMockOrg('1', 'caseoh_')).org,
            (await getMockOrg('2', 'faide')).org,
            (await getMockOrg('3', 'xQc')).org,
            (await getMockOrg('4', 'LilyPichu')).org,
            (await getMockOrg('5', 'Scarra')).org,
        ],
    };
    return data;
};

export const createOrg = async (org: Org): Promise<{ org: Org }> => {
    console.log('create org', org);
    const data = {
        org: org,
    };
    return data;
};
