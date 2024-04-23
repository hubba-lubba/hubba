import { useEffect, useState } from 'react';
import { useWindowDimensions } from '@/utils/hooks';
import clsx from 'clsx';

const resizing = {
    large: [400, 400], // [margin (at which there's only 1 card), interval (at which number cards change)]
    medium: [400, 500],
    small: [300, 500], // not sure why but larger for interval is better here; prevents too many small cards being in row.
};

const styles = {
    large: 'h-[500px]',
    medium: 'h-[400px]',
    small: 'h-[400px]',
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
        <section className={clsx('flex w-full flex-col', styles[variant])}>
            {title && (
                <div className="bold w-100 relative h-[5%] text-xs uppercase text-hubba-600">
                    <div className="relative z-10 inline-block bg-hubba-900 pr-2">
                        {title}
                    </div>
                    <span className="absolute left-0 top-[0.5rem] z-0 inline-block w-full border-t-[1px] border-solid border-hubba-600" />
                </div>
            )}
            {children.length === 0 ? (
                <p className="flex h-[95%] w-full items-center justify-center">
                    Chirp... {title} is empty :&#40;
                </p>
            ) : (
                <div className="flex h-[95%] flex-row space-x-3">
                    {children.slice(0, numCards)}
                </div>
            )}
        </section>
    );
};
