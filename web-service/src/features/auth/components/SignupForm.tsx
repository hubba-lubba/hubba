import { Form, TextField, SubmitButton } from '@/components/form';
import { TextButton } from '@/components/elements/buttons';
import { email, username, password, confirmPassword } from '@/lib/validation';
import { signup } from '../api';
import Joi from 'joi';
import { AuthLinks } from './AuthLinks';
import { useState } from 'react';

const schema = Joi.object({
    email: email,
    username: username,
    password: password,
    confirmPassword: confirmPassword,
});

type SignupValues = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
};

type SignupFormProps = {
    onSuccess: () => void;
};

export const SignupForm = ({ onSuccess }: SignupFormProps) => {
    const [error, setError] = useState<string>();

    const doSignUp = async (data: SignupValues) => {
        console.log('signup');
        console.log(data);
        const { email, username, password } = data;
        try {
            await signup(email, username, password);
            onSuccess();
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
            setError((error as Error).message);
        }
    };

    return (
        <>
            <Form<SignupValues, typeof schema>
                title="Sign Up"
                onSubmit={doSignUp}
                schema={schema}
            >
                {({ register, formState }) => (
                    <>
                        <TextField
                            type="email"
                            label="Email Address"
                            error={formState.errors['email']}
                            registration={register('email')}
                        />
                        <TextField
                            type="text"
                            label="Username"
                            error={formState.errors['username']}
                            registration={register('username')}
                        />
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
                        <SubmitButton text="Sign Up" />
                    </>
                )}
            </Form>
            {error && <div className="mt-5 text-red-500">{error}</div>}
            <AuthLinks>
                <TextButton
                    text="Already have an account?"
                    anchortext="Sign in"
                    path="/auth/signin"
                />
            </AuthLinks>
        </>
    );
};
