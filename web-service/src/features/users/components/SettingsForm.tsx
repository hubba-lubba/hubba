import { UpdateUserInfoForm } from './UpdateUserInfoForm';
import { Layout } from '@/components/layout';

export const SettingsForm = () => {
    return (
        <Layout style="flex-col items-center h-full">
            <h1 className="text-5xl font-bold">Settings</h1>
            <UpdateUserInfoForm />
        </Layout>
    );
};
