import clsx from 'clsx';

export type CardProps = {
    title?: string;
    description?: string;
    thumbnail?: string;
    url: string;
    platform: string;
    tags: string[];
    viewer_count: number;
};

export const Card = ({
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
            className="flex w-1/3 flex-col"
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
