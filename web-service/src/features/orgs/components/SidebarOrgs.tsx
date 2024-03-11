import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '@/components/layout';
import { CiCirclePlus } from 'react-icons/ci';

const TEST = {
    orgs: [
        {
            name: 'Org 1',
        },
        {
            name: 'Org 2',
        },
        {
            name: 'Org 3',
        },
        {
            name: 'Org 4',
        },
    ],
};

export const SidebarOrgs = () => {
    return (
        <SidebarSection title="My Orgs">
            {TEST.orgs.map((org, index) => (
                <Button key={index} variant="text">
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
