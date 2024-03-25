//file exists to follow React fast refresh rules
import { Outlet } from 'react-router-dom';
import { Interface } from '@/components/layout';

export const App = () => {
    return (
        <Interface>
            <Outlet />
        </Interface>
    );
};
