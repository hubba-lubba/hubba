import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '.';
import { SidebarOrgs } from '@/features/orgs/components';
import { SidebarEvents } from '@/features/events/components';
import { SidebarChannels } from '@/features/channels/components';
import { BsHouseDoor, BsCalendarEvent, BsRss, BsPeople } from "react-icons/bs";

export const Sidebar = () => {
    return (
        <aside className="fixed inset-0 top-32 pl-16 w-80 space-y-8 overflow-y-auto p-16 scrollbar-thin scrollbar-thumb-hubba-800">
            {/* mts are for non-first childs -> not? */}
            <SidebarSection>
                <Button variant="image" Icon={BsHouseDoor}>
                    Feed
                </Button>
                <Button variant="image" Icon={BsRss}>
                    Discover
                </Button>
                <Button variant="image" Icon={BsCalendarEvent}>
                    Events
                </Button>
                <Button variant="image" Icon={BsPeople}>
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

