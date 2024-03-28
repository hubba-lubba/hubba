import clsx from 'clsx';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

interface SidebarSectionProps {
    children: React.ReactNode;
    title?: string;
    collapsible?: boolean;
    showMoreState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const SidebarSection = ({
    children,
    title,
    collapsible,
    showMoreState,
}: SidebarSectionProps) => {
    const [showMore, setShowMore] = showMoreState ?? [];
    console.log(title, collapsible);
    return (
        <section className="flex flex-col space-y-3">
            {title && setShowMore != undefined && showMore != undefined && (
                <small
                    className={clsx(
                        'bold flex select-none flex-row place-content-between items-center text-xs uppercase text-hubba-600',
                        collapsible ? 'cursor-pointer hover:underline' : '',
                    )}
                    onClick={() => setShowMore(!showMore)}
                >
                    {title}
                    {collapsible &&
                        // arrow vs text? i think arrow looks nicer but can be ambiguous
                        (showMore != undefined && showMore ? (
                            <MdKeyboardArrowUp />
                        ) : (
                            <MdKeyboardArrowDown />
                        ))}
                </small>
            )}
            {children}
        </section>
    );
};
