import clsx from 'clsx';

const variants = {
    large: 'h-96',
    medium: 'h-72',
};

interface ShelfProps {
    variant?: 'large' | 'medium';
    children?: React.ReactNode;
    title?: string | undefined;
}

export const Shelf = ({ variant = 'medium', children, title }: ShelfProps) => {
    return (
        <section
            className={clsx(
                'flex w-full flex-col space-y-3',
                variants[variant],
            )}
        >
            {title && (
                <small className="bold text-xs uppercase text-hubba-600">
                    {title}
                </small>
            )}
            <div className="flex flex-row space-x-3">{children}</div>
        </section>
    );
};
