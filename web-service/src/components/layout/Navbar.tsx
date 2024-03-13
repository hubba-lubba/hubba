import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthProvider';
import { logout } from '@/lib/auth';
import Logo from '../elements/Logo';

type NavbarProps = {
    bare?: boolean;
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
                            <div className="flex flex-row gap-1">
                                <Link to="/user/edit">Edit</Link>
                                <Link to="/user/message">Message</Link>
                                <Link to="/user/inbox">Inbox</Link>
                                <Link to="/user/settings">Settings</Link>
                                <Link to="/user/profile">
                                    <img src={user.photoURL!} alt="pfp" />
                                </Link>
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
    <Button handleClick={signOut}>Sign Out</Button>
     */
};
