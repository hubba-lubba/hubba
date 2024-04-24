import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '@/components/layout';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/contexts/UserProvider';
import { Pfp } from '@/components/elements';

export const SidebarOrgs = () => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const { userOrgs } = useContext(UserContext);
    const navigate = useNavigate();

    const collapseLength = 3;

    return (
        <SidebarSection
            title="My Orgs"
            collapsible={userOrgs.length > collapseLength}
            showMoreState={[showMore, setShowMore]}
        >
            {userOrgs
                .map((org, index) => (
                    <Button
                        key={`sidebar-org-${org.org_id}-${index}`}
                        variant="text"
                        icon={<Pfp image={org.image} variant="org"/>}
                        handleClick={() => navigate(`/orgs/${org.org_id}`)}
                    >
                        {org.name}
                    </Button>
                ))
                .slice(0, showMore ? userOrgs.length : collapseLength)}
            {/* <Button
                variant="image"
                icon={<LuPlusCircle />}
                handleClick={() => navigate('/orgs')}
            >
                Join an Org
            </Button> */}
            {/* remove this and make it so they gotta click into an org to apply */}
        </SidebarSection>
    );
};
