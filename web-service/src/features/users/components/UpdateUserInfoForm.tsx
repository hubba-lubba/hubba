import { ChangePassword, ChangeEmail, ChangeUsername, ChangeProfilePicture } from './settings_forms'

export function UpdateUserInfoForm() {
    return (
        <section className="flex flex-col mb-6 gap-16">
            <ChangeProfilePicture />
            <ChangeUsername />
            <ChangeEmail />
            <ChangePassword />
        </section>
    )
}
