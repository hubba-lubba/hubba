interface SidebarSectionProps {
    children: React.ReactNode;
    title?: string | undefined;
}

export const SidebarSection = ({ children, title }: SidebarSectionProps) => {
    return (
        <section className="flex flex-col space-y-3">
            {title && (
                <small className="bold text-xs uppercase text-hubba-600">
                    {title}
                </small>
            )}
            {children}
        </section>
    );
};
