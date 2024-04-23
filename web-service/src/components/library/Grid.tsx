interface GridProps {
    children?: React.ReactNode;
    title?: string | undefined;
}

export function Grid({ children, title }: GridProps) {
    return (
        <section className="flex min-h-[300px] w-full flex-col space-y-1">
            {title && (
                <div className="bold w-100 relative h-[5%] text-xs uppercase text-hubba-600">
                    <div className="relative z-10 inline-block bg-hubba-900 pr-2">
                        {title}
                    </div>
                    <span className="absolute left-0 top-[0.5rem] z-0 inline-block w-full border-t-[1px] border-solid border-hubba-600" />
                </div>
            )}
            <div className="grid-autofill h-[95%] flex-1 gap-3">{children}</div>
        </section>
    );
}
