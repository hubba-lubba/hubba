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
            <section className="mb-6">
                <h2 className="text-2xl mb-2">Connected Apps</h2>
                <ConnectedApp />
            </section>
            <section className="mb-4">
                <h2 className="text-2xl mb-2">Change Password</h2>
                <ChangePassword />
            </section>
        </div>
    )
};
