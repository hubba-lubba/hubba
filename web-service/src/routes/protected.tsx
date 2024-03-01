import { Navigate } from 'react-router-dom';
import { Home } from '@/pages/Home';

const App = () => {
    // user profile page
    return <Home />;
};

export const protectedRoutes = [
    {
        path: '/profile',
        element: <App />,
        children: [
            // { path: '/', element: <Dashboard /> },
            { path: '*', element: <Navigate to="." /> },
        ],
    },
];
