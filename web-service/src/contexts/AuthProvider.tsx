import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserProvider';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'firebase/compat/app';

export const AuthContext = React.createContext<firebase.User>(null!);

export const AuthProvider = ({ children }: React.PropsWithChildren<object>) => {
    const [user, setUser] = useState<firebase.User>(null!);
    const [loadingUser, setLoadingUser] = useState<boolean>(true);
    const { setUserData, createUser } = useContext(UserContext);

    const auth = getAuth();
    useEffect(() => {
        const myListener = onAuthStateChanged(auth, (user) => {
            setUser(user as firebase.User);
            setLoadingUser(false);
        });
        return () => {
            if (myListener) myListener();
        };
    }, [auth]);

    useEffect(() => {
        const loadUserData = async () => {
            if (user) {
                try {
                    // TODO: replace with getUser
                    const userData = await createUser(
                        user.uid,
                        user.displayName ?? 'User',
                        user.email ?? '',
                    );
                    setUserData(userData);
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            } else {
                setUserData(null!);
            }
        };
        const load = async () => {
            try {
                await loadUserData();
            } catch (error: any) {
                if (
                    error.status === 404 ||
                    error.status === 403 ||
                    error.status === 400
                ) {
                    try {
                        await createUser(
                            user.uid,
                            user.displayName ?? 'User',
                            user.email ?? '',
                        );
                        await loadUserData();
                        return;
                    } catch (error) {
                        console.log('Error creating first user data');
                        console.log(error);
                        return;
                    }
                }
                console.log(error);
                return;
            }
        };
        load();
    }, [user, setUserData, createUser]);

    if (loadingUser) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
