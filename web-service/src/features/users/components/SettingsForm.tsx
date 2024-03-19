import { useState } from 'react'
import ConnectedApp from './ConnectedApp'
import ChangePassword from './ChangePassword'

export function SettingsForm() {

    const [notifs, setNotifs] = useState(true)
    function handleNotifications() {
        setNotifs(prevNotifs => !prevNotifs)

        //set context or someting
    }

    const SAMPLE_CONNECTIONS = [
        {
            platform: 'X',
            connected: false,
            id: 0
        },
        {
            platform: 'twitch',
            connected: false,
            id: 1
        },
        {
            platform: 'spotify',
            connected: false,
            id: 2
        },
        {
            platform: 'discord',
            connected: false,
            id: 3
        },
        {
            platform: 'linux',
            connected: true,
            id: 4
        },
    ]
    const connections = SAMPLE_CONNECTIONS.map(elem => <ConnectedApp {...elem} />)

    return (
        <div className="flex flex-col items-start">
            <h1 className="text-5xl font-bold mb-8">Settings</h1>
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
                    checked={notifs}
                    onChange={handleNotifications} />
            </section>
            <section className="mb-6">
                <h2 className="text-3xl mb-2">Connected Apps</h2>
                {connections}
            </section>
            <section className="mb-6">
                <h2 className="text-3xl mb-2">Change Password</h2>
                <ChangePassword />
            </section>
        </div>
    )
}
