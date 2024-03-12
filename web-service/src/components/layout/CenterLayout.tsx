import React from 'react';

type CenterLayoutProps = {
    children: React.ReactNode;
};

export const CenterLayout = ({ children }: CenterLayoutProps) => {
    return (
        <div className="flex h-full justify-center border-none bg-none">
            {children}
        </div>
    );
};
