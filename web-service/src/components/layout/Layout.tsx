import React from 'react';
import clsx from 'clsx';

const variants = {
    left: 'justify-start',
    center: 'justify-center',
};

type LayoutProps = {
    variant?: 'left' | 'center';
    style?: string;
    children: React.ReactNode;
};

export const Layout = ({
    variant = 'center',
    style,
    children,
}: LayoutProps) => {
    return (
        <div
            className={clsx(
                'flex h-full border-none bg-none',
                variants[variant],
                style,
            )}
        >
            {children}
        </div>
    );
};

export const PageLayout = ({ variant = 'center', children }: LayoutProps) => {
    return (
        <Layout variant={variant} style="w-full">
            <div className="w-full max-w-[1200px]">{children}</div>
        </Layout>
    );
};
