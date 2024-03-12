import React from 'react';
import { Layout, Navbar } from '@/components/layout';

type LayoutProps = {
    children: React.ReactNode;
};

export const AuthLayout = ({ children }: LayoutProps) => {
    return (
        <Layout>
            <Navbar bare={true} />
            <div className="my-auto">{children}</div>
        </Layout>
    );
};
