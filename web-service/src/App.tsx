import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './features/auth/components/LoginForm';
import Signup from './features/auth/components/SignupForm';
import ForgotPassword from './features/auth/components/ForgotPasswordForm';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/login" Component={Login} />
                <Route path="/signup" Component={Signup} />
                <Route path="/forgotpassword" Component={ForgotPassword} />
            </Routes>
        </Router>
    );
}

export default App;
