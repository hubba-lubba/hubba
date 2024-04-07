import { useNavigate } from 'react-router-dom';

export type CardProps = {
    url: string;
    internal?: boolean;
    media: React.ReactNode;
    footer: React.ReactNode;
};

const CardMedia = ({ children }: { children: React.ReactNode }) => {
    return <div className="h-5/6">{children}</div>;
};

export const CardFooter = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex h-1/6 items-center p-1">{children}</div>;
};

export const Card = ({ url, internal = true, media, footer }: CardProps) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex h-full w-full cursor-pointer flex-col rounded"
            onClick={() =>
                internal ? navigate(url) : window.open(url, '_blank')
            }
        >
            {/* put in here a defined structure for image/iframe and bottom header? */}
            {/* allows to set height for image and to have it not overtake footer */}
            {/* see EventCard for example */}
            <CardMedia>{media}</CardMedia>
            <CardFooter>{footer}</CardFooter>
        </div>
    );
};
