import { Link } from 'react-router-dom';

// componentize?
const Logo = () => {
    return (
        <div className="flex h-full w-80 items-center justify-start px-16">
            <img src="/hubba.png" alt="logo" />
        </div>
    );
};

export const Navbar = () => {
    return (
        <nav className="fixed flex h-32 w-full flex-grow-0">
            <Logo />
            <div className="flex h-auto w-8/12 items-center justify-end p-8">
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
};
