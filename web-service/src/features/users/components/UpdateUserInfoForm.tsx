import {
    ChangePassword,
    ChangeEmail,
    ChangeUsername,
    ChangeProfilePicture,
    ChangeBio
} from './settings_forms'

export function UpdateUserInfoForm() {
    return (
        <section className="flex flex-col mb-6 gap-16 lg:grid lg:grid-cols-2">
            <div className="flex flex-col gap-16">
                <ChangeProfilePicture />
                <ChangeBio />
            </div>
            <div className="flex flex-col gap-16">
                <ChangeUsername />
                <ChangeEmail />
                <ChangePassword />
            </div>
        </section>
    )
}
