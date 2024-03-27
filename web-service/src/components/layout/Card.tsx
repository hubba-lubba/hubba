import clsx from 'clsx';

// use some js to have these decrease with screen width
const variants = {
    full: 'w-full',
    large: 'w-1/3',
    medium: 'w-1/5',
};

export type CardProps = {
    variant?: 'full' | 'large' | 'medium';
    title?: string;
    description?: string;
    thumbnail?: string;
    url: string;
    platform: string;
    tags: string[];
    viewer_count: number;
};

export const Card = ({
    variant = 'medium',
    title,
    description,
    thumbnail,
    url,
    platform,
    tags,
    viewer_count,
}: CardProps) => {
    return (
        <div
            className={clsx('flex cursor-pointer flex-col', variants[variant])}
            onClick={() => window.open(url, '_blank')}
        >
            {/* add org/user pfp here too */}
            <img src={thumbnail} alt={title} className="rounded-xl" />
            <h1>{title}</h1>
            <p>{description}</p>
            <p>{platform}</p>
            <p>{tags}</p>
            <p>{viewer_count}</p>
        </div>
    );
};
