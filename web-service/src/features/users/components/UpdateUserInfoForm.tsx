import {
    ChangeChannel,
    ChangeBio,
    ChangePassword,
    ChangeEmail,
    ChangeUsername,
    ChangeProfilePicture,
} from './settings_forms';

export function UpdateUserInfoForm() {
    return (
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
    );
}
