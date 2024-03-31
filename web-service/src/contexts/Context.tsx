import React from 'react';
import { AuthProvider } from './AuthProvider';
import { UserProvider } from './UserProvider';
import { ModalProvider } from './ModalProvider';

const providers = [AuthProvider, UserProvider, ModalProvider];

/**
 * This component is used to wrap the entire application with all the context providers.
 */
export function ContextProvider({ children }: { children: React.ReactNode }) {
    return providers.reduce((acc, Provider) => {
        return <Provider>{acc}</Provider>;
    }, children);
}
