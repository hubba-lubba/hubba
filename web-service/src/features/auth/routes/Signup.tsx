import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { SignupForm } from '../components/SignupForm';

export const Signup = () => {
    const navigate = useNavigate();

    // add clientside functionality -> on successful signin, redirect to /home
    return (
        <Layout>
            <SignupForm />
        </Layout>
    );
};
