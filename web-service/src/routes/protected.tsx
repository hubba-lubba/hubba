import { Navigate, Outlet } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { UserRoutes } from '@/features/users/routes';
import { Interface } from '@/components/layout';

const App = () => {
    return (
        <Interface>
            <Outlet />
        </Interface>
    );
};

export const protectedRoutes = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/user/*', element: <UserRoutes /> }, //split into protected (profiles that isn't own, settings) and public (other profiles)
            // 404
            { path: '*', element: <Navigate to="/" /> },
        ],
    },
];
