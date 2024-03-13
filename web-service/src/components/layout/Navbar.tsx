import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthProvider';
import { logout } from '@/lib/auth';
import Logo from '../elements/Logo';
import NavbarSearchBar from '../elements/NavbarSearchBar'

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
                <div className="grid grid-cols-2 w-full items-center px-16 py-8">
                    {user ? (
                        <>
                            <div className="my-auto h-[36px]">
                                <NavbarSearchBar />
                            </div>
                            <div className="flex flex-row gap-1 justify-end">
                                <Link to="/user/edit">Edit</Link>
                                <Link to="/user/message">Message</Link>
                                <Link to="/user/inbox">Inbox</Link>
                                <Link to="/user/settings">Settings</Link>
                                <Link to="/user/profile">
                                    <img src={user.photoURL!} alt="pfp" />
                                </Link>
                            </div>
                        </>
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
