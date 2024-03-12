import { useNavigate } from 'react-router-dom';

import { Layout } from './Layout';
import { SigninForm } from '../components/SigninForm';

export const Signin = () => {
    const navigate = useNavigate();

    // add clientside functionality -> on successful signin, redirect to /home
    return (
        <Layout>
            <SigninForm onSuccess={() => navigate('/')} />
        </Layout>
    );
};
