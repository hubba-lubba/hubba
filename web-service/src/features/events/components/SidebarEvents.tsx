import { Button } from "@/components/elements/buttons";
import { SidebarSection } from "@/components/layout";

const TEST = {
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
};

export const SidebarEvents = () => {
    return (
        <SidebarSection title="My Events">
            {TEST.events.map((event, index) => (
                <Button key={index} variant="text">
                    {event.name}
                </Button>
            ))}
        </SidebarSection>
    )
};  