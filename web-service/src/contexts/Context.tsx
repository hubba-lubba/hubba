import React from 'react';
import { AuthProvider } from './AuthProvider';

const providers = [AuthProvider];

/**
 * This component is used to wrap the entire application with all the context providers.
 */
export function ContextProvider({ children }: { children: React.ReactNode }) {
    return providers.reduce((acc, Provider) => {
        return <Provider>{acc}</Provider>;
    }, children);
}
