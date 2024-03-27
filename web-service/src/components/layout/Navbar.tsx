import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthProvider';
import { UserContext } from '@/contexts/UserProvider';
import Logo from '../elements/Logo';
import NavbarSearchBar from '../elements/NavbarSearchBar';
import { BsPencil, BsInbox, BsThreeDots } from 'react-icons/bs';
import { FaRegUserCircle } from 'react-icons/fa';
import { signout } from '@/lib/auth';

const NavDropdown = () => {
    const user = useContext(AuthContext);

    return (
        <div className="fixed right-6 top-24 flex w-[110px] flex-col gap-4 bg-hubba-900">
            {user ? (
                <>
                    <Link to="/profile" className="h-full w-full px-6 pt-6">
                        Profile
                    </Link>
                    <span
                        className="h-full w-full px-6 pb-6"
                        onClick={() => signout()}
                    >
                        Sign Out
                    </span>
                </>
            ) : (
                <Link to="/auth/signin" className="h-full w-full p-6">
                    Sign In
                </Link>
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
    const { userData } = useContext(UserContext);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                toggleDropdown &&
                !(event.target as HTMLElement).closest('.pfp')
            ) {
                setToggleDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [toggleDropdown]);

    return (
        <nav className="fixed flex h-32 w-full flex-grow-0">
            <Logo />
            {!bare && (
                <div className="grid w-full grid-cols-2 items-center px-16 py-8">
                    <div className="my-auto h-[36px]">
                        <NavbarSearchBar />
                    </div>
                    <div className="flex flex-row items-center justify-end gap-4">
                        {userData && (
                            <>
                                <Link to="/update">
                                    <BsPencil size={24} />
                                </Link>
                                <Link to="/inbox">
                                    <BsInbox size={24} />
                                </Link>
                                <Link to="/settings">
                                    <BsThreeDots size={24} />
                                </Link>
                            </>
                        )}
                        <div
                            className="pfp cursor-pointer"
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        >
                            {user?.photoURL ? (
                                <img src={user.photoURL!} alt="pfp" />
                            ) : (
                                <FaRegUserCircle size={38} />
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
