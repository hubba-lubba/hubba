import React from 'react';

type AuthLinksProp = {
    children: React.ReactNode;
};

export const AuthLinks = ({ children }: AuthLinksProp) => {
    return <div className="text-sm mt-6 flex-col space-y-2">{children}</div>;
};
