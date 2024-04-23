import { Form, TextField, SubmitButton } from '@/components/form';
import { UserContext } from '@/contexts/UserProvider';
import { password, confirmPassword } from '@/lib/validation';
import Joi from 'joi';
import { useContext } from 'react';

const schema = Joi.object({
    password: password,
    confirmPassword: confirmPassword,
});

type ChangePasswordValues = {
    password: string;
    newPassword: string;
    confirmPassword: string;
};

export function ChangePassword() {
    const { changePassword } = useContext(UserContext);

    async function handleSubmit(data: ChangePasswordValues) {
        const { password, newPassword } = data;

        try {
            await changePassword(password, newPassword);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-3xl">Change Password</h2>
            <Form<ChangePasswordValues, typeof schema>
                onSubmit={handleSubmit}
                schema={schema}
            >
                {({ register, formState }) => (
                    <>
                        {/* hidden username field for password manager purposes */}
                        <input
                            type="text"
                            name="username"
                            className="hidden"
                            autoComplete="off"
                        />
                        <TextField
                            type="password"
                            label="Password"
                            error={formState.errors['password']}
                            registration={register('password')}
                            autoComplete="current-password"
                        />
                        <TextField
                            type="password"
                            label="New Password"
                            error={formState.errors['newPassword']}
                            registration={register('newPassword')}
                            autoComplete="new-password"
                        />
                        <TextField
                            type="password"
                            label="Confirm Password"
                            error={formState.errors['confirmPassword']}
                            registration={register('confirmPassword')}
                        />
                        <SubmitButton text="Submit" />
                    </>
                )}
            </Form>
        </div>
    );
}
