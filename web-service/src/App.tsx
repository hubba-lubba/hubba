import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LoginForm';
import Signup from './components/SignupForm';
import ForgotPassword from './components/ForgotPasswordForm';
import Home from './components/Home';

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
