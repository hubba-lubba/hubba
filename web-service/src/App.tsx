import { BrowserRouter as Router } from 'react-router-dom';
import { ContextProvider } from '@/contexts/Context';
import { AppRoutes } from '@/routes';

function App() {
    return (
        <ContextProvider>
            <Router>
                <AppRoutes />
            </Router>
        </ContextProvider>
    );
}

export default App;
