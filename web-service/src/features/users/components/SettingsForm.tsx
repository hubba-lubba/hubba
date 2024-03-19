import { useState, useContext } from 'react'
import ConnectedApp from './ConnectedApp'
import ChangePassword from './ChangePassword'
import { AuthContext } from '@/contexts/AuthProvider';

type userSettings = {
    connections?: { platform: string; username?: string }[];
}

export function SettingsForm() {

    const [notifs, setNotifs] = useState(true)
    const user = useContext(AuthContext) as userSettings

    function handleNotifications() {
        setNotifs(prevNotifs => !prevNotifs)
        //set context or someting
    }

    const SAMPLE_CONNECTIONS = [
        {
            platform: 'X',
        },
        {
            platform: 'Twitch',
        },
        {
            platform: 'Spotify',
        },
        {
            platform: 'Discord',
        },
        {
            platform: '',
        },
    ]
    user.connections ||= SAMPLE_CONNECTIONS

    const connections = []
    for (let i = 0; i < user.connections.length; i++)
        connections.push(<ConnectedApp {...user.connections[i]} key={i} />)

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
                <button
                    className="border mt-4 px-4 py-2 rounded">
                    Add Connection
                </button>
            </section>
            <section className="mb-6">
                <h2 className="text-3xl mb-2">Change Password</h2>
                <ChangePassword />
            </section>
        </div>
    )
}
