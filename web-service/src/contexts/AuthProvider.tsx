import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'firebase/compat/app';

export const AuthContext = React.createContext<firebase.User>(null!);

export const AuthProvider = ({ children }: React.PropsWithChildren<object>) => {
    const [user, setUser] = useState<firebase.User>(null!);
    const [loadingUser, setLoadingUser] = useState<boolean>(true);

    const auth = getAuth();
    useEffect(() => {
        const myListener = onAuthStateChanged(auth, (user: any) => {
            setUser(user);
            setLoadingUser(false);
        });
        return () => {
            if (myListener) myListener();
        };
    }, []);

    if (loadingUser) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
