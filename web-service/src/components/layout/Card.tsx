import clsx from 'clsx';

// use some js to have these decrease with screen width
const variants = {
    large: 'w-1/3',
    medium: 'w-1/5',
};

export type CardProps = {
    variant?: 'large' | 'medium';
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
            className={clsx('flex flex-col', variants[variant])}
            onClick={() => window.open(url, '_blank')}
        >
            <img src={thumbnail} alt={title} className="rounded-xl" />
            <h1>{title}</h1>
            <p>{description}</p>
            <p>{platform}</p>
            <p>{tags}</p>
            <p>{viewer_count}</p>
        </div>
    );
};
