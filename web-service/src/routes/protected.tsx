import { Navigate, Outlet } from 'react-router-dom';
import { UserProtectedRoutes } from '@/features/users/routes';
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
            { path: '/*', element: <UserProtectedRoutes /> }, //Q: if i want to add more to this but they come from different components, how? or should i organize differently?
            // 404
            { path: '*', element: <Navigate to="/" /> },
        ],
    },
];
