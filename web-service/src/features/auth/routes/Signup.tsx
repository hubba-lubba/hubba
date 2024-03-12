import { useNavigate } from 'react-router-dom';

import { AuthLayout } from './AuthLayout';
import { SignupForm } from '../components/SignupForm';

export const Signup = () => {
    const navigate = useNavigate();

    // add clientside functionality -> on successful signin, redirect to /home
    return (
        <AuthLayout>
            <SignupForm onSuccess={() => navigate('/')} />
        </AuthLayout>
    );
};
