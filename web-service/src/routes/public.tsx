import { Navigate, Outlet } from 'react-router-dom';
import { AuthRoutes } from '@/features/auth';
import { Interface } from '@/components/layout';
import { Home } from '@/pages/Home';
import { EventRoutes } from '@/features/events';
import { OrgRoutes } from '@/features/orgs';

const App = () => {
    return <Outlet />;
};

export const publicRoutes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: (
                    <Interface>
                        <Home />
                    </Interface>
                ),
            },
            {
                path: '/events/*',
                element: (
                    <Interface>
                        <EventRoutes />
                    </Interface>
                ),
            },
            {
                path: '/orgs/*',
                element: (
                    <Interface>
                        <OrgRoutes />
                    </Interface>
                ),
            },
            { path: '/auth/*', element: <AuthRoutes /> },
            // 404
            { path: '*', element: <Navigate to="/" /> },
        ],
    },
];
