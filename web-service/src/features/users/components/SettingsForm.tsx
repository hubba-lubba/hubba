import {
    ChangeChannel,
    ChangeBio,
    ChangePassword,
    ChangeEmail,
    ChangeUsername,
    ChangeProfilePicture,
} from './settings_forms';
import { Layout } from '@/components/layout';

export const SettingsForm = () => {
    return (
        <Layout style="flex-col items-center h-full">
            <h1 className="text-5xl font-bold">Settings</h1>

            <section className="flex h-[90%] w-5/6 flex-row pt-6">
                <ChangeProfilePicture />
                <div className="scroll-gutter flex h-full w-5/6 flex-col gap-16 overflow-y-auto">
                    <ChangeChannel />
                    <ChangeBio />
                    <ChangeUsername />
                    <ChangeEmail />
                    <ChangePassword />
                </div>
            </section>
        </Layout>
    );
};
