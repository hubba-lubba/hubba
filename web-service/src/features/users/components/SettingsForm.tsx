import { UpdateUserInfoForm } from './UpdateUserInfoForm'
import { Layout } from '@/components/layout';

export const SettingsForm = () => {
    return (
        <Layout style="flex-col items-center">
            <h1 className="mb-8 text-5xl font-bold">Settings</h1>
            <UpdateUserInfoForm />
        </Layout>
    );
};
