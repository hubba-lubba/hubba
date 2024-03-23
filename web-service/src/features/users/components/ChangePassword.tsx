import { useState, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import { User, updatePassword } from 'firebase/auth';

export default function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const user = useContext(AuthContext) as User;

    const handleNewPasswordInput = (event: React.FormEvent) =>
        setNewPassword((event.target as HTMLInputElement).value);
    const handleConfirmInput = (event: React.FormEvent) =>
        setConfirm((event.target as HTMLInputElement).value);

    //takes an error code and puts up a relevant error message
    function handleErrorMessage(errorCode: string) {
        switch (errorCode) {
            case 'success':
                setErrorMessage('Password reset success');
                break;
            case 'password-length':
                setErrorMessage(
                    'New password must be at least 8 characters long.',
                );
                break;
            case 'auth/requires-recent-login':
                //some weird reauthenticate bullshit
                setErrorMessage('Reauthenticate your login.');
                break;
            default:
                setErrorMessage('Unknown error occurred. Try again later.');
        }
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (newPassword !== confirm) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (newPassword.length < 8) {
            setErrorMessage('password-length');
            return;
        }

        //do something with the user context
        try {
            await updatePassword(user, newPassword);
            handleErrorMessage('success');
        } catch (error: any) {
            handleErrorMessage(error.code);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>{errorMessage}</div>
            <div className="grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-2">
                <label htmlFor="newPassword" className="text-xl">
                    New Password
                </label>
                <input
                    type="text"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onInput={handleNewPasswordInput}
                    className="p-1 text-neutral-900"
                />
                <label htmlFor="confirm" className="text-xl">
                    Confirm New Password
                </label>
                <input
                    type="text"
                    id="confirm"
                    name="confirm"
                    value={confirm}
                    onInput={handleConfirmInput}
                    className="p-1 text-neutral-900"
                />
            </div>
            <button className="mt-4 rounded border px-4 py-2">Submit</button>
        </form>
    );
}
