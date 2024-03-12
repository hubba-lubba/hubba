import { useNavigate } from 'react-router-dom';

import { AuthLayout } from './AuthLayout';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

export const ForgotPassword = () => {
    const navigate = useNavigate();

    // add clientside functionality -> on successful signin, redirect to /home
    return (
        <AuthLayout>
            <ForgotPasswordForm onSuccess={() => navigate('/')} />
        </AuthLayout>
    );
};
