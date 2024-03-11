import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'firebase/compat/app';

export const AuthContext = React.createContext<firebase.User>(null!);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [currentUser, setCurrentUser] = useState<firebase.User>(null!);
    const [loadingUser, setLoadingUser] = useState<boolean>(true);

    const auth = getAuth();
    useEffect(() => {
        let myListener = onAuthStateChanged(auth, (user: any) => {
            setCurrentUser(user);
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

    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    );
};
