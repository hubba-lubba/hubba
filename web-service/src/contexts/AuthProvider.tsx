import React, { useState, useEffect, useContext } from 'react';

export const AuthContext = React.createContext<any>(null!);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [currentUser, setCurrentUser] = useState<any>(null!);
    const [loadingUser, setLoadingUser] = useState<boolean>(false);

    useEffect(() => {
        // let myListener = onAuthStateChanged(auth, (user: any) => {
        //   setCurrentUser(user);
        //   setLoadingUser(false);
        // });
        // return () => {
        //   if (myListener) myListener();
        // };
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
