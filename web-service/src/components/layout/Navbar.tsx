import { Link } from 'react-router-dom';

// componentize?
const Logo = () => {
    return (
        <div className="flex justify-start items-center p-8 h-full w-56">
            <img src="/hubba.png" alt="logo" />
        </div>
    );
};

export const Navbar = () => {
    return (
        <nav className="flex w-full h-[10%]">
            <Logo />
            <div className="flex justify-end items-center p-8 w-10/12 h-auto">
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
};
