import { useState, useContext } from 'react'

export default function ChangePassword() {

    const [newPassword, setNewPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const handleNewPasswordInput = (event: React.FormEvent) =>
        setNewPassword(event.target.value)
    const handleConfirmInput = (event: React.FormEvent) =>
        setConfirm(event.target.value)

    function handleSubmit(event) {
    }

    return (
        <form
            onSubmit={handleSubmit}>
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
                    onInput={handleNewPasswordInput} />
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
                    onInput={handleConfirmInput} />
            </div>
        </form>
    )
}
