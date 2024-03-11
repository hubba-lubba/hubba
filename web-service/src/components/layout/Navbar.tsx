import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthProvider';
import { logout } from '@/lib/auth';
import { Button } from '../elements/buttons';

// componentize?
const Logo = () => {
    return (
        <div className="flex h-full w-80 items-center justify-start px-16">
            <img src="/hubba.png" alt="logo" />
        </div>
    );
};

export const Navbar = () => {
    const currentUser = useContext(AuthContext);

    const signOut = async (): Promise<void> => {
        try {
            await logout();
        } catch (error: any) {
            console.log(`Error: ${error.message}`);
        }
    };

    return (
        <nav className="fixed flex h-32 w-full flex-grow-0">
            <Logo />
            <div className="flex h-auto w-8/12 items-center justify-end p-8">
                {currentUser ? (
                    <Button handleClick={signOut}>Sign Out</Button>
                ) : (
                    <Link to="/auth/signin">Sign In</Link>
                )}
            </div>
        </nav>
    );
};
