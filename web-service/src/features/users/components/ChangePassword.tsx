import { useState, useContext } from 'react'
import { AuthContext } from '@/contexts/AuthProvider';
import { updatePassword } from 'firebase/auth'

export default function ChangePassword() {

    const [newPassword, setNewPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const user = useContext(AuthContext)

    const handleNewPasswordInput = (event: React.FormEvent) =>
        setNewPassword(event.target.value)
    const handleConfirmInput = (event: React.FormEvent) =>
        setConfirm(event.target.value)

    //takes a firebase auth error and puts up a relevant error message
    function handleErrorMessage(error: { code: string }) {
        switch (error.code) {
            case 'auth/weak-password':
                setErrorMessage("Password must be at least 6 characters long.")
                break
            case 'auth/requires-recent-login':
                //some weird reauthenticate bullshit
                setErrorMessage("Reauthenticate your login.")
                break
            default:
                setErrorMessage("Unknown error occurred. Try again later.")
        }
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        if (newPassword !== confirm) {
            setErrorMessage("Passwords do not match.")
            return
        }

        //do something with the user context
        try {
            await updatePassword(user!, newPassword)
        } catch (error) {
            handleErrorMessage(error as { code: string })
        }

    }

    return (
        <form
            onSubmit={handleSubmit}>
            <div className="text-red-700">
                {errorMessage}
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-1">
                <label
                    htmlFor="newPassword"
                    className="text-xl">
                    New Password
                </label>
                <input
                    type="text"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onInput={handleNewPasswordInput}
                    className="text-neutral-900 p-1" />
                <label
                    htmlFor="confirm"
                    className="text-xl">
                    Confirm New Password
                </label>
                <input
                    type="text"
                    id="confirm"
                    name="confirm"
                    value={confirm}
                    onInput={handleConfirmInput}
                    className="text-neutral-900 p-1" />
            </div>
            <button className="border mt-4 px-4 py-2 rounded">Submit Change</button>
        </form>
    )
}
