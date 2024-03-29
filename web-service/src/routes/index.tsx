// here we handle routing (middleware)
import { useRoutes } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import { EventRoutes } from '@/features/events';
import { OrgRoutes } from '@/features/orgs';
import { UserCommonRoutes } from '@/features/users';
import { DiscoverRoutes } from '@/features/discover';
import { App } from './App';

export const AppRoutes = () => {
    const user = useContext(AuthContext);
    // log current location
    // console.log('location', window.location.pathname);

    // TODO: reroute to /signin for user protected routes when not signed in
    const commonRoutes = [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/user/*',
                    element: <UserCommonRoutes />,
                },
                {
                    path: '/events/*',
                    element: <EventRoutes />,
                },
                {
                    path: '/orgs/*',
                    element: <OrgRoutes />,
                },
                {
                    path: '/discover/*',
                    element: <DiscoverRoutes />,
                },
            ],
        },
    ];

    const routes = user ? protectedRoutes : publicRoutes;

    const element = useRoutes([...commonRoutes, ...routes]);

    return <>{element}</>;
};
