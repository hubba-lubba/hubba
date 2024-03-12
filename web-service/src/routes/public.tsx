import { Navigate, Outlet } from 'react-router-dom';
import { AuthRoutes } from '@/features/auth';
import { Interface } from '@/components/layout';
import { Home } from '@/pages/Home';

const App = () => {
    return <Outlet />;
};

export const publicRoutes = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Interface><Home /></Interface> },
            { path: '/auth/*', element: <AuthRoutes /> },
            // 404
            { path: '*', element: <Navigate to="/" /> },
        ],
    },
];
