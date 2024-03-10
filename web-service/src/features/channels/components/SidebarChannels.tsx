import { Button } from "@/components/elements/buttons";
import { SidebarSection } from "@/components/layout";
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
};

export const SidebarChannels = () => {
    return (
        <SidebarSection title="My Channels">
            {TEST.channels.map((channel, index) => (
                <Button key={index} variant="image" image={channel.img}>
                    {channel.name}
                </Button>
            ))}
            <Button variant="text">
                <small className="mt-2 uppercase text-hubba-600">
                    Show more
                </small>
            </Button>
        </SidebarSection>
    )
};  