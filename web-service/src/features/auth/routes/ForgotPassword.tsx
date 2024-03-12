import { useNavigate } from 'react-router-dom';

import { Layout } from './Layout';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

export const ForgotPassword = () => {
    const navigate = useNavigate();

    // add clientside functionality -> on successful signin, redirect to /home
    return (
        <Layout>
            <ForgotPasswordForm onSuccess={() => navigate('/')} />
        </Layout>
    );
};
