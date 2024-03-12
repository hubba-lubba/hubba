// here we handle routing (middleware)
import { useRoutes } from 'react-router-dom';
import { Home } from '@/pages/Home'; //move into features, maybe folder called 'pages'
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';

export const AppRoutes = () => {
    const user = useContext(AuthContext);
    console.log(user);

    const commonRoutes = [{ path: '/', element: <Home /> }];

    const routes = user ? protectedRoutes : publicRoutes;

    const element = useRoutes([...routes, ...commonRoutes]);

    return <>{element}</>;
};
