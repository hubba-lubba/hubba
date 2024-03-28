import { ChangePassword, ChangeEmail } from './settings_forms'

export function UpdateUserInfoForm() {
    return (
        <section className="flex flex-col mb-6 gap-16">
            <ChangeEmail />
            <ChangePassword />
        </section>
    )
}
