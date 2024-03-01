import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="logo">
            <img src="/hubba.png" alt="logo" />
        </div>
    );
};

export const Navbar = () => {
    return (
        <nav>
            <Logo />
            <div className="links">
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
};

