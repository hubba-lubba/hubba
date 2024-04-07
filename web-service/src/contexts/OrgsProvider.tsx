// arrays that hold events and orgs persistent to session
// initialize seed/mock data here.

// user information to load onto webpage: username, profile image, followed streams, events, INBOX

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Org } from '@/features/orgs/types';
import { UserContext } from './UserProvider';

interface OrgsContextType {
    orgsData: Org[];
    setOrgsData: (org: Org[]) => void;
    getMockOrg: (id: string) => Promise<{ org: Org }>;
    getMockOrgs: (ids: string[]) => Promise<Org[]>;
    getDiscoverOrgs: () => Promise<{ orgs: Org[] }>;
    createOrg: (org: Org) => Promise<{ org: Org }>;
}

export const OrgsContext = createContext<OrgsContextType>(null!);

export const OrgsProvider = ({ children }: React.PropsWithChildren<object>) => {
    const [orgsData, setOrgsData] = useState<Org[]>([]);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        const orgs = [
            {
                org_id: '1',
                name: `org 1`,
                image: 'https://via.placeholder.com/250',
                description:
                    'org1 description. \n join us at https://www.google.com!',
                channel: 'caseoh_',
                owner: '1',
                moderators: ['mod1', 'mod2'],
                users: ['1', '2', '3', '4'],
                events: ['1', '4'],
                created: new Date(),
            },
            {
                org_id: '2',
                name: `org 2`,
                image: 'https://via.placeholder.com/250',
                description:
                    'org2 description. \n join us at https://www.google.com!',
                channel: 'faide',
                owner: '2',
                moderators: ['mod1', 'mod2'],
                users: ['1', '2', '3', '4'],
                events: ['0'],
                created: new Date(),
            },
            {
                org_id: '3',
                name: `org 3`,
                image: 'https://via.placeholder.com/250',
                description:
                    'org3 description. \n join us at https://www.google.com!',
                channel: 'xQc',
                owner: '3',
                moderators: ['mod1', 'mod2'],
                users: ['3', '1', '2', '4'],
                events: ['4', '2'],
                created: new Date(),
            },
            {
                org_id: '4',
                name: `org 4`,
                image: 'https://via.placeholder.com/250',
                description:
                    'org4 description. \n join us at https://www.google.com!',
                channel: 'ninja',
                owner: '4',
                moderators: ['mod1', 'mod2'],
                users: ['4', '1', '2', '3'],
                events: ['6'],
                created: new Date(),
            },
            {
                org_id: '5',
                name: `org 5`,
                image: 'https://via.placeholder.com/250',
                description:
                    'org5 description. \n join us at https://www.google.com!',
                channel: 'shroud',
                owner: '1',
                moderators: ['mod1', 'mod2'],
                users: ['1', '2', '3'],
                events: ['5'],
                created: new Date(),
            },
        ];

        setOrgsData(orgs as Org[]);
    }, []);

    const getMockOrg = async (id: string): Promise<{ org: Org }> => {
        const org = orgsData.find((org) => org.org_id === id);
        if (org === undefined) throw new Error('Org not found');
        const data = {
            org: org,
        };
        return data;
    };

    const getMockOrgs = async (ids: string[]): Promise<Org[]> => {
        const data = Promise.all(
            ids.map(async (id) => (await getMockOrg(id)).org),
        );
        return data;
    };

    const getDiscoverOrgs = async (): Promise<{ orgs: Org[] }> => {
        // get orgs that the user isn't in
        const data = {
            orgs: orgsData.filter(
                (org) => !org.users.includes(userData.user_id),
            ),
        };
        return data;
    };

    const createOrg = async (org: Org): Promise<{ org: Org }> => {
        console.log('create org', org);
        const data = {
            org: org,
        };
        return data;
    };

    return (
        <OrgsContext.Provider
            value={{
                orgsData,
                setOrgsData,
                getMockOrg,
                getMockOrgs,
                getDiscoverOrgs,
                createOrg,
            }}
        >
            {children}
        </OrgsContext.Provider>
    );
};
