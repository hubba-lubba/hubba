import { useEffect, useState } from 'react';
import { useWindowDimensions } from '@/utils/hooks';
import clsx from 'clsx';

const resizing = {
    large: [400, 400], // [margin (at which there's only 1 card), interval (at which number cards change)]
    medium: [400, 300],
    small: [300, 500], // not sure why but larger for interval is better here; prevents too many small cards being in row.
};

const styles = {
    large: 'h-[400px]',
    medium: 'h-[350px]',
    small: 'h-[350px]',
};

interface ShelfProps {
    children: React.ReactNode[];
    title?: string | undefined;
    variant?: 'large' | 'medium' | 'small';
}

export const Shelf = ({ children, title, variant = 'medium' }: ShelfProps) => {
    const [numCards, setNumCards] = useState(15 / (resizing[variant][1] / 100));
    const { width } = useWindowDimensions();
    useEffect(() => {
        setNumCards(
            Math.ceil((width - resizing[variant][0]) / resizing[variant][1]) ||
                1,
        );
    }, [width, variant]);
    return (
        <section
            className={clsx('flex w-full flex-col space-y-3', styles[variant])}
        >
            <div className="flex h-full flex-row space-x-3">
                {children.slice(0, numCards)}
            </div>
            {title && (
                <small className="bold text-xs uppercase text-hubba-600">
                    {title}
                </small>
            )}
        </section>
    );
};
