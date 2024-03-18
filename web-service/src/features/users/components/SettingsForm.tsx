import ConnectedApp from './ConnectedApp'
import ChangePassword from './ChangePassword'

export const SettingsForm = () => {
    return (
        <div className="flex flex-col items-start">
            <h1 className="text-3xl mb-8">Settings</h1>
            <section className="flex flex-row gap-2 mb-6">
                <label
                    htmlFor="notifications"
                    className="text-xl">
                    Notifications
                </label>
                <input
                    type="checkbox"
                    id="notifications"
                    name="notifications"
                    checked={true} />
            </section>
            <section className="flex flex-row gap-2 mb-6">
                <h2 className="text-2xl">Connected Apps</h2>
                <ConnectedApp />
            </section>
            <section className="flex flex-row gap-2 mb-4">
                <h2 className="text-2xl">Change Password</h2>
                <ChangePassword />
            </section>
        </div>
    )
};
