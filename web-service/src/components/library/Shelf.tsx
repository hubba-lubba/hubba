import { useEffect, useState } from 'react';
import { useWindowDimensions } from '@/utils/hooks';

const variants = {
    large: [400, 400], // [margin (at which there's only 1 card), interval (at which number cards change)]
    medium: [400, 300],
};

interface ShelfProps {
    children: React.ReactNode[];
    title?: string | undefined;
    variant?: 'large' | 'medium';
}

export const Shelf = ({ children, title, variant = 'medium' }: ShelfProps) => {
    const [numCards, setNumCards] = useState(15 / (variants[variant][1] / 100));
    const { width } = useWindowDimensions();
    useEffect(() => {
        setNumCards(
            Math.ceil((width - variants[variant][0]) / variants[variant][1]) ||
                1,
        );
    }, [width, variant]);
    return (
        <section className="flex w-full flex-col space-y-3">
            <div className="flex flex-row space-x-3">
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
