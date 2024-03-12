interface ShelfProps {
    children?: React.ReactNode;
    title?: string | undefined;
}

export const Shelf = ({ children, title }: ShelfProps) => {
    return (
        <section className="flex w-full flex-col space-y-3">
            <div className="flex flex-row space-x-3">{children}</div>
            {title && (
                <small className="bold text-xs uppercase text-hubba-600">
                    {title}
                </small>
            )}
        </section>
    );
};
