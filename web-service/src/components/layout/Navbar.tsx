import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthProvider';
import { logout } from '@/lib/auth';
import SearchBar from '../elements/SearchBar.tsx';

type NavbarProps = {
    bare?: boolean;
};

// componentize?
const Logo = () => {
    return (
        <div className="flex h-full w-sidebar items-center justify-start px-8">
            <Link to="/">
                <img src="/hubba.png" alt="logo" />
            </Link>
        </div>
    );
};

export const Navbar = ({ bare = false }: NavbarProps) => {
    const user = useContext(AuthContext);

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
            {!bare && (
                <div className="flex h-auto w-8/12 items-center justify-end p-8">
                    {user ? (
                        <div className="grid grid-cols-2 gap-2">
                            <input type="text"></input>
                            <div className="flex flex-row gap-1">
                                <div>edit</div>
                                <div>message</div>
                                <div>inbox</div>
                                <Link to="/user/settings">Settings</Link>
                                <img src={user.photoURL!} alt="pfp" />
                            </div>
                        </div>
                    ) : (
                        <Link to="/auth/signin">Sign In</Link>
                    )}
                </div>
            )}
        </nav>
    );

    /*
    <Link to="/user/profile">Profile</Link>
    <Button handleClick={signOut}>Sign Out</Button>
     */
};
