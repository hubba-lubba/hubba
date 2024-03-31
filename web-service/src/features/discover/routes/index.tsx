import { Routes, Route } from 'react-router-dom';
import { DiscoverFeed } from '../components/DiscoverFeed';

export const DiscoverRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DiscoverFeed />} />
        </Routes>
    );
};
