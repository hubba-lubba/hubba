import React from 'react';
import clsx from 'clsx';

type LayoutProps = {
    style?: string;
    children: React.ReactNode;
};

export const Layout = ({ style, children }: LayoutProps) => {
    return (
        <div
            className={clsx(
                'flex border-none bg-none',
                style,
            )}
        >
            {children}
        </div>
    );
};

export const PageLayout = ({ children }: LayoutProps) => {
    return (
        <Layout style="w-full justify-center">
            <div className="w-full max-w-[1200px]">{children}</div>
        </Layout>
    );
};
