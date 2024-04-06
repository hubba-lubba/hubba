import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '.';
import { UserContext } from '@/contexts/UserProvider';
import { SidebarOrgs } from '@/features/orgs/components';
import { SidebarEvents } from '@/features/events/components';
import { SidebarChannels } from '@/features/users/components';
import { BsHouseDoor, BsCalendarEvent, BsRss, BsPeople } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

export const Sidebar = () => {
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);

    return (
        <aside className="scroll-gutter fixed inset-0 top-32 w-sidebar space-y-8 overflow-y-auto p-8 scrollbar-thin">
            {/* mts are for non-first childs -> not? */}
            <SidebarSection>
                <Button
                    variant="image"
                    icon={<BsHouseDoor className="pr-2.5" size={32} />}
                    handleClick={() => navigate('/')}
                >
                    Feed
                </Button>
                <Button
                    variant="image"
                    icon={<BsRss className="pr-2.5" size={32} />}
                    handleClick={() => navigate('/discover')}
                >
                    Discover
                </Button>
                <Button
                    variant="image"
                    icon={<BsCalendarEvent className="pr-2.5" size={32} />}
                    handleClick={() => navigate('/events')}
                >
                    Events
                </Button>
                <Button
                    variant="image"
                    icon={<BsPeople className="pr-2.5" size={32} />}
                    handleClick={() => navigate('/orgs')}
                >
                    Organizations
                </Button>
                {/* <Button icon="/icons/community-icon.svg">Community</Button>
                    <Button icon="/icons/education-icon.svg">Education</Button> */}
            </SidebarSection>
            {userData && (
                <>
                    <SidebarChannels />
                    <SidebarEvents />
                    <SidebarOrgs />
                </>
            )}
        </aside>
    );
};
