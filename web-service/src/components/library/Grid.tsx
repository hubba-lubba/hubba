interface GridProps {
    children?: React.ReactNode;
    title?: string | undefined;
}

export function Grid({ children, title }: GridProps) {
    return (
        <section className="flex w-full flex-col space-y-3">
            <div className="grid-autofit gap-3">{children}</div>
            {title && (
                <small className="bold text-xs uppercase text-hubba-600">
                    {title}
                </small>
            )}
        </section>
    );
}
