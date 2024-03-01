import { Button } from '@/components/elements/buttons';
import defaultimg from '@/assets/images/defaultimg.png';

const TEST = {
    channels: [
        {
            name: 'Channel 1',
            img: defaultimg,
        },
        {
            name: 'Channel 2',
            img: defaultimg,
        },
        {
            name: 'Channel 3',
            img: defaultimg,
        },
        {
            name: 'Channel 4',
            img: defaultimg,
        },
    ],
    events: [
        {
            name: 'Event 1',
        },
        {
            name: 'Event 2',
        },
        {
            name: 'Event 3',
        },
        {
            name: 'Event 4',
        },
        {
            name: 'Event 4',
        },
        {
            name: 'Event 4',
        },
        {
            name: 'Event 4',
        },
        {
            name: 'Event 4',
        },
        {
            name: 'Event 4',
        },
    ],
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
        {
            name: 'Org 4',
        },
        {
            name: 'Org 4',
        },
    ],
};

export const Sidebar = () => {
    return (
        // TODO: componentize button sections, move to features, & make responsive
        <aside className="fixed inset-0 top-20 w-56 space-y-8 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-hubba-800">
            {/* mts are for non-first childs -> not? */}
            <SidebarSection>
                <Button variant="menu" icon="/icons/feed-icon.svg">
                    Feed
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
            <SidebarSection title="Discover">
                {TEST.channels.map((channel, index) => (
                    <Button key={index} variant="icon" icon={channel.img}>
                        {channel.name}
                    </Button>
                ))}
                <Button variant="text">
                    <small className="text-hubba-600 mt-2 uppercase">
                        Show more
                    </small>
                </Button>
            </SidebarSection>
            <SidebarSection title="Events">
                {TEST.events.map((event, index) => (
                    <Button key={index} variant="text">
                        {event.name}
                    </Button>
                ))}
            </SidebarSection>
            <SidebarSection title="My Orgs">
                {TEST.orgs.map((org, index) => (
                    <Button key={index} variant="text">
                        {org.name}
                    </Button>
                ))}
                <Button variant="menu" icon="/icons/join-org-icon.svg">
                    Join an Org
                </Button>
                {/* remove this and make it so they gotta click into an org to apply */}
            </SidebarSection>
        </aside>
    );
};

interface SidebarSectionProps {
    children: React.ReactNode;
    title?: string | undefined;
}

const SidebarSection = ({ children, title }: SidebarSectionProps) => {
    return (
        <section className="flex flex-col space-y-3">
            {title && (
                <small className="bold text-xs text-hubba-600 uppercase">
                    {title}
                </small>
            )}
            {children}
        </section>
    );
};
