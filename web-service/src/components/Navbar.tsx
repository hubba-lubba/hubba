import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Navbar.scss';

export default function Navbar(): React.ReactElement {
    return (
        <nav>
            <Logo />
            <div className="links">
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}

const Logo = () => {
    return (
        <div className="logo">
            <img src="/hubba.png" alt="logo" />
        </div>
    );
};
