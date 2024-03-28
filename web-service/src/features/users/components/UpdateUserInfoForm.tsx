import { ChangePassword, ChangeEmail, ChangeUsername } from './settings_forms'

export function UpdateUserInfoForm() {
    return (
        <section className="flex flex-col mb-6 gap-16">
            <ChangeUsername />
            <ChangeEmail />
            <ChangePassword />
        </section>
    )
}
