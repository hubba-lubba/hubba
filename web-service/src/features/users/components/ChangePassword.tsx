import { useState, useContext } from 'react'
import { AuthContext } from '@/contexts/AuthProvider';

export default function ChangePassword() {

    const [newPassword, setNewPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const user = useContext(AuthContext)

    const handleNewPasswordInput = (event: React.FormEvent) =>
        setNewPassword(event.target.value)
    const handleConfirmInput = (event: React.FormEvent) =>
        setConfirm(event.target.value)

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        if (newPassword !== confirm) {
            setErrorMessage("Passwords do not match.")
            return
        }

        //do something with the user context
        console.log(user)
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
                    Confirm Password
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
