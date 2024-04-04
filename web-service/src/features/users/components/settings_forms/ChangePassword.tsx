import { Form, TextField, SubmitButton } from '@/components/form';
import { password, confirmPassword } from '@/lib/validation';
import Joi from 'joi';

const schema = Joi.object({
    password: password,
    confirmPassword: confirmPassword,
});

type ChangePasswordValues = {
    password: string;
    confirmPassword: string;
};


export function ChangePassword() {
    async function handleSubmit(data: ChangePasswordValues) {
        const { password, confirmPassword } = data;
        try {
            console.log('change password: ', password, confirmPassword);
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
                        <TextField
                            type="password"
                            label="Password"
                            error={formState.errors['password']}
                            registration={register('password')}
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
