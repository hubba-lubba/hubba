import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '@/components/layout';
import { CiCirclePlus } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { Org } from '../types';
import { getUserOrgs } from '../api';

export const SidebarOrgs = () => {
    const [orgs, setOrgs] = useState<Org[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const orgsData = await getUserOrgs();
            setOrgs(orgsData.orgs);
        };

        fetchData();
    }, []);

    return (
        <SidebarSection title="My Orgs">
            {orgs.map((org, index) => (
                <Button key={`sidebar-org-${org.id}-${index}`} variant="text">
                    {org.name}
                </Button>
            ))}
            <Button variant="image" Icon={CiCirclePlus}>
                Join an Org
            </Button>
            {/* remove this and make it so they gotta click into an org to apply */}
        </SidebarSection>
    );
};
