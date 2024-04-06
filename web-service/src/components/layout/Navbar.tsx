import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthProvider';
import { UserContext } from '@/contexts/UserProvider';
import { ModalContext } from '@/contexts/ModalProvider';
import Logo from '../elements/Logo';
import NavbarSearchBar from '../elements/NavbarSearchBar';
import { HiMiniSignal } from 'react-icons/hi2';
import { LuPlusSquare } from 'react-icons/lu';
import { DevTool } from '../dev';
import { signout } from '@/lib/auth';
import { Pfp } from '../elements/Pfp';
// import { BsInbox } from 'react-icons/bs';

type DropdownOptionProps = {
    children: React.ReactNode;
    to?: string;
    onClick?: () => void;
};

const DropdownOption = ({
    children,
    to = '.',
    onClick,
}: DropdownOptionProps) => {
    // React Router Link fires onClick before rerouting. Flipped in Nextjs.
    return (
        <Link
            to={to}
            onClick={onClick}
            className="h-full w-full px-6 py-1 first:pt-4 last:pb-4"
        >
            {children}
        </Link>
    );
};

const NavDropdown = () => {
    const user = useContext(AuthContext);

    return (
        <div className="fixed right-6 top-24 flex w-[110px] flex-col rounded-b bg-hubba-900">
            {user ? (
                <>
                    <DropdownOption to="/profile">Profile</DropdownOption>
                    <DropdownOption to="/edit">Edit</DropdownOption>
                    <DropdownOption to="/settings">Settings</DropdownOption>
                    <DropdownOption to="/" onClick={() => signout()}>
                        Sign Out
                    </DropdownOption>
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
    const { setShowUploadModal, setShowStreamModal } = useContext(ModalContext);
    const { userData } = useContext(UserContext);
    const user = useContext(AuthContext);

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
                        {import.meta.env.DEV && <DevTool />}
                        {userData && (
                            <>
                                <LuPlusSquare
                                    className="cursor-pointer"
                                    size={24}
                                    onClick={() => setShowUploadModal(true)}
                                />
                                <HiMiniSignal
                                    className="cursor-pointer"
                                    size={24}
                                    onClick={() => setShowStreamModal(true)}
                                />
                                {/* <Link to="/inbox">
                                    <BsInbox size={24} />
                                </Link> */}
                            </>
                        )}
                        <div
                            className="pfp cursor-pointer"
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        >
                            {/* TODO: use UserContext for navbar */}
                            <Pfp image={user?.photoURL || undefined} />
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
