import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '.';
import { SidebarOrgs } from '@/features/orgs/components';
import { SidebarEvents } from '@/features/events/components';
import { SidebarChannels } from '@/features/users/components';
import { BsHouseDoor, BsCalendarEvent, BsRss, BsPeople } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <aside className="fixed inset-0 top-32 w-sidebar space-y-8 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-hubba-800">
            {/* mts are for non-first childs -> not? */}
            <SidebarSection>
                <Button
                    variant="image"
                    Icon={BsHouseDoor}
                    handleClick={() => navigate('/')}
                >
                    Feed
                </Button>
                <Button variant="image" Icon={BsRss}>
                    Discover
                </Button>
                <Button
                    variant="image"
                    Icon={BsCalendarEvent}
                    handleClick={() => navigate('/events')}
                >
                    Events
                </Button>
                <Button
                    variant="image"
                    Icon={BsPeople}
                    handleClick={() => navigate('/orgs')}
                >
                    Organizations
                </Button>
                {/* <Button icon="/icons/community-icon.svg">Community</Button>
                    <Button icon="/icons/education-icon.svg">Education</Button> */}
            </SidebarSection>
            <SidebarChannels />
            <SidebarEvents />
            <SidebarOrgs />
        </aside>
    );
};
