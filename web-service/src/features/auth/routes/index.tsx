import { Route, Routes } from 'react-router-dom';

import { Signin } from './Signin';
import { Signup } from './Signup';
import { ForgotPassword } from './ForgotPassword';

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot" element={<ForgotPassword />} />
        </Routes>
    );
};
