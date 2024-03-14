// here we handle routing (middleware)
import { useRoutes, Outlet } from 'react-router-dom';
import { Home } from '@/pages/Home'; //move into features, maybe folder called 'pages'
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import { EventRoutes } from '@/features/events';
import { OrgRoutes } from '@/features/orgs';
import { Interface } from '@/components/layout';

const App = () => {
    return (
        <Interface>
            <Outlet />
        </Interface>
    );
};

export const AppRoutes = () => {
    const user = useContext(AuthContext);
    // log current location
    console.log('location', window.location.pathname);

    const commonRoutes = [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '/events/*',
                    element: <EventRoutes />,
                },
                {
                    path: '/orgs/*',
                    element: <OrgRoutes />,
                },
            ],
        },
    ];

    const routes = user ? protectedRoutes : publicRoutes;

    const element = useRoutes([...routes, ...commonRoutes]);

    return <>{element}</>;
};
