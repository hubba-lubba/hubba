import { Event } from '@/features/events/types';
import { Org } from '@/features/orgs/types';
import { User } from '@/features/users/types';
import { TwitchLiveEmbed } from '../external';

// user livestreams onlyneed channel; but we want to include user pfp, name
// events may or may not be livestreams, show iframe if no thumbnail. if thumbnail, link to event page.
// orgs only have thumbnail (image), name, and description.
// videos only need video thumbnail and title https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api

export type CardProps = {
    children: React.ReactNode;
    url?: string;
};

const Card = ({ children, url }: CardProps) => {
    return (
        <div
            className="flex w-full cursor-pointer flex-col"
            onClick={() => window.open(url, '_blank')}
        >
            {children}
        </div>
    );
};
// TODO: YOU ARE HERE. set up card header (bottom) and create cards for event, org, and video.
// TODO: then, update cards across pages
export const ChannelCard = ({ user }: { user: User }) => {
    return (
        <Card>
            <TwitchLiveEmbed channel={user.channel} />
            <div>
                <img src={user.profile_image} />
                <h2>{user.username}</h2>
            </div>
        </Card>
    );
};
