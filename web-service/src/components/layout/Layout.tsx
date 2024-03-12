import React from 'react';
import clsx from 'clsx';

const variants = {
    left: 'justify-start',
    center: 'justify-center',
};

type LayoutProps = {
    variant?: 'left' | 'center';
    children: React.ReactNode;
};

export const Layout = ({ variant = 'center', children }: LayoutProps) => {
    return (
        <div
            className={clsx(
                'flex h-full border-none bg-none',
                variants[variant],
            )}
        >
            {children}
        </div>
    );
};
