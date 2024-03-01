// here we handle routing (middleware)
import { useRoutes } from 'react-router-dom';

import { Home } from '@/pages/Home'; //move into features, maybe folder called 'pages'
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
    //   const auth = useAuth(); // authContext
    const auth = { user: false }; // mock authContext

    const commonRoutes = [{ path: '/', element: <Home /> }];

    const routes = auth.user ? protectedRoutes : publicRoutes;

    const element = useRoutes([...routes, ...commonRoutes]);

    return <>{element}</>;
};
