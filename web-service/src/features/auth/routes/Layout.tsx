import React from 'react';
import { CenterLayout } from '@/components/layout/CenterLayout';
import { Navbar } from '@/components/layout';

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    return (
        <CenterLayout>
            <Navbar bare={true} />
            <div className="my-auto">{children}</div>
        </CenterLayout>
    );
};
