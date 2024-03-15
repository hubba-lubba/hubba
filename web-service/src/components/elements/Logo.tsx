import { Link } from 'react-router-dom';

export default function Logo() {
    return (
        <div className="flex h-full w-sidebar items-center justify-start px-8">
            <Link to="/">
                <img src="/hubba.png" alt="logo" />
            </Link>
        </div>
    );
}
