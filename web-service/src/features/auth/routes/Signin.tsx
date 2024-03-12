import { useNavigate } from 'react-router-dom';

import { AuthLayout } from './AuthLayout';
import { SigninForm } from '../components/SigninForm';

export const Signin = () => {
    const navigate = useNavigate();

    // add clientside functionality -> on successful signin, redirect to /home
    return (
        <AuthLayout>
            <SigninForm onSuccess={() => navigate('/')} />
        </AuthLayout>
    );
};
