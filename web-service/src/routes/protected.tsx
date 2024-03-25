import { UserProtectedRoutes } from '@/features/users/routes';
import { NotFound } from '@/pages/NotFound';
import { App } from './App.tsx'

export const protectedRoutes = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/*', element: <UserProtectedRoutes /> }, //Q: if i want to add more to this but they come from different components, how? or should i organize differently?
            // 404
            { path: '*', element: <NotFound /> },
        ],
    },
];
