import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthProvider';
import Logo from '../elements/Logo';
import NavbarSearchBar from '../elements/NavbarSearchBar';
import { BsPencil, BsInbox, BsThreeDots } from 'react-icons/bs';
import { signout } from '@/lib/auth';

const NavDropdown = () => {
    const user = useContext(AuthContext);

    return (
        <div className="fixed right-6 top-24 flex flex-col gap-4 bg-hubba-900 p-6">
            {user ? (
                <>
                    <Link to="/user/profile">Profile</Link>
                    <span onClick={() => signout()}>Sign Out</span>
                </>
            ) : (
                <Link to="/auth/signin">Sign In</Link>
            )}
        </div>
    );
};

type NavbarProps = {
    bare?: boolean;
};

export const Navbar = ({ bare = false }: NavbarProps) => {
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const user = useContext(AuthContext);

    return (
        <nav className="fixed flex h-32 w-full flex-grow-0">
            <Logo />
            {!bare && (
                <div className="grid w-full grid-cols-2 items-center px-16 py-8">
                    <div className="my-auto h-[36px]">
                        <NavbarSearchBar />
                    </div>
                    <div className="flex flex-row items-center justify-end gap-4">
                        <Link to="/update">
                            <BsPencil size={24} />
                        </Link>
                        <Link to="/inbox">
                            <BsInbox size={24} />
                        </Link>
                        <Link to="/settings">
                            <BsThreeDots size={24} />
                        </Link>
                        <div
                            className="cursor-pointer"
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        >
                            {user?.photoURL ? (
                                <img src={user.photoURL!} alt="pfp" />
                            ) : (
                                <img
                                    src="/src/assets/images/defaultimg.png"
                                    className="h-9 w-9"
                                />
                            )}
                            {toggleDropdown && <NavDropdown />}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );

    /*
    <Button handleClick={signOut}>Sign Out</Button>
     */
};
