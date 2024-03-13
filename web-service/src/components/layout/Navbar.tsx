import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthProvider';
import { logout } from '@/lib/auth';
import Logo from '../elements/Logo';
import NavbarSearchBar from '../elements/NavbarSearchBar'
import { BsPencil, BsInbox, BsChatDots, BsThreeDots } from 'react-icons/bs'

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
                            <div className="flex flex-row gap-4 justify-end items-center">
                                <Link to="/user/edit"><BsPencil size={24} /></Link>
                                <Link to="/user/message"><BsChatDots size={24}/></Link>
                                <Link to="/user/inbox"><BsInbox size={24}/></Link>
                                <Link to="/user/settings"><BsThreeDots size={24}/></Link>
                                <Link to="/user/profile">
                                    { user.photoURL?
                                    <img src={user.photoURL!} alt="pfp" /> :
                                    <img
                                        src="/src/assets/images/defaultimg.png"
                                        className="h-9 w-9" /> }
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
