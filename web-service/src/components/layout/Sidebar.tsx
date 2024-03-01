import { Button } from '@/components/elements/buttons';
import defaultimg from '@/assets/images/defaultimg.png';

export const Sidebar = () => {
    return (
        // TODO: componentize button sections, move to features, & make responsive
        <div className="fixed b-0 p-8 w-48 h-11/12 overflow-y-auto scrollbar-thin scrollbar-thumb-hubba-500">
            <div className="flex flex-col space-y-8">
                {/* mts are for non-first childs -> not? */}
                <div className="flex flex-col space-y-1">
                    <Button icon="/icons/feed-icon.svg">Feed</Button>
                    <Button icon="/icons/events-icon.svg">Events</Button>
                    <Button icon="/icons/organizations-icon.svg">
                        Organizations
                    </Button>
                    {/* <Button icon="/icons/community-icon.svg">Community</Button>
                    <Button icon="/icons/education-icon.svg">Education</Button> */}
                </div>
                <div className="flex flex-col space-y-1">
                    <small className="text-gray-400 bold text-xs">
                        DISCOVER
                    </small>
                    <Button icon={defaultimg}>Channel 1</Button>
                    <Button icon={defaultimg}>Channel 2</Button>
                    <Button icon={defaultimg}>Channel 3</Button>
                    <Button icon={defaultimg}>Channel 4</Button>
                    <small className="mt-2 text-gray-400 underline">
                        SHOW MORE
                    </small>
                </div>
                <div className="flex flex-col space-y-1">
                    <small className="text-gray-400 bold text-xs">
                        UPCOMING EVENTS
                    </small>
                    <Button>Event 1</Button>
                    <Button>Event 2</Button>
                    <Button>Event 3</Button>
                    <Button>Event 4</Button>
                </div>
                <div className="flex flex-col space-y-1">
                    <small className="text-gray-400 bold text-xs">
                        MY ORGS
                    </small>
                    <Button>Org 1</Button>
                    <Button>Org 2</Button>
                    <Button>Org 3</Button>
                    <Button>Org 4</Button>
                    <Button icon="/icons/join-org-icon.svg">Join an Org</Button>
                    {/* remove this and make it so they gotta click into an org to apply */}
                </div>
            </div>
        </div>
    );
};
