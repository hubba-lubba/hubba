// arrays that hold events and orgs persistent to session
// initialize seed/mock data here.

// user information to load onto webpage: username, profile image, followed streams, events, INBOX

import React, { createContext, useEffect, useState } from 'react';
import { Org } from '@/features/orgs/types';

interface OrgsContextType {
    orgsData: Org[];
    setOrgsData: (org: Org[]) => void;
}

export const OrgsContext = createContext<OrgsContextType>(null!);

export const OrgsProvider = ({ children }: React.PropsWithChildren<object>) => {
    const [orgsData, setOrgsData] = useState<Org[]>([]);

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

    return (
        <OrgsContext.Provider
            value={{
                orgsData,
                setOrgsData,
            }}
        >
            {children}
        </OrgsContext.Provider>
    );
};
