import { ChangePassword, ChangeEmail, ChangeUsername, ChangeProfilePicture } from './settings_forms'

export function UpdateUserInfoForm() {
    return (
        <section className="flex flex-col mb-6 gap-16 lg:grid lg:grid-cols-2">
            <ChangeProfilePicture />
            <div className="flex flex-col gap-16">
                <ChangeUsername />
                <ChangeEmail />
                <ChangePassword />
            </div>
        </section>
    )
}
