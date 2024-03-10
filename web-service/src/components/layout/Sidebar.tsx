import { Button } from '@/components/elements/buttons';
import { SidebarSection } from '.';
import { SidebarOrgs } from '@/features/orgs/components';
import { SidebarEvents } from '@/features/events/components';
import { SidebarChannels } from '@/features/channels/components';

export const Sidebar = () => {
    return (
        <aside className="fixed inset-0 top-20 w-56 space-y-8 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-hubba-800">
            {/* mts are for non-first childs -> not? */}
            <SidebarSection>
                <Button variant="menu" icon="/icons/feed-icon.svg">
                    Feed
                </Button>
                <Button variant="menu" icon="/icons/feed-icon.svg">
                    Discover
                </Button>
                <Button variant="menu" icon="/icons/events-icon.svg">
                    Events
                </Button>
                <Button variant="menu" icon="/icons/organizations-icon.svg">
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

