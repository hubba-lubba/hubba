// user livestreams onlyneed channel; but we want to include user pfp, name
// events may or may not be livestreams, show iframe if no thumbnail. if thumbnail, link to event page.
// orgs only have thumbnail (image), name, and description.
// videos only need video thumbnail and title https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api

import { useNavigate } from 'react-router-dom';

export type CardProps = {
    children: React.ReactNode;
    url: string;
    internal?: boolean;
};

export const Card = ({ children, url, internal = true }: CardProps) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex w-full cursor-pointer flex-col"
            onClick={() => (internal ? navigate(url) : window.open(url, '_blank'))}
        >
            {children}
        </div>
    );
};
// TODO: YOU ARE HERE. set up card header (bottom) and create cards for event, org, and video.
// TODO: then, update cards across pages
