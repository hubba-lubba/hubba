import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '@/components/layout';
import { CiCirclePlus } from 'react-icons/ci';
import { useEffect, useState, useContext } from 'react';
import { Org } from '../types';
import { getSidebarOrgs } from '../api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/contexts/UserProvider';

export const SidebarOrgs = () => {
    const [orgs, setOrgs] = useState<Org[]>([]);
    const [showMore, setShowMore] = useState<boolean>(false);
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const orgsData = await getSidebarOrgs(userData);
            setOrgs(orgsData);
        };

        fetchData();
    }, [userData]);

    const collapseLength = 3;

    return (
        <SidebarSection
            title="My Orgs"
            collapsible={orgs.length > collapseLength}
            showMoreState={[showMore, setShowMore]}
        >
            {orgs
                .map((org, index) => (
                    <Button
                        key={`sidebar-org-${org.id}-${index}`}
                        variant="text"
                        handleClick={() => navigate(`/orgs/${org.id}`)}
                    >
                        {org.name}
                    </Button>
                ))
                .slice(0, showMore ? orgs.length : collapseLength)}
            <Button
                variant="image"
                Icon={CiCirclePlus}
                handleClick={() => navigate('/orgs')}
            >
                Join an Org
            </Button>
            {/* remove this and make it so they gotta click into an org to apply */}
        </SidebarSection>
    );
};
