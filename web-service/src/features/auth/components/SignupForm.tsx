import { Form, TextField, SubmitButton } from '@/components/form';
import { TextButton } from '@/components/elements/buttons';
import Joi from 'joi';

const schema = Joi.object({
    email: Joi.string().min(1).required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(1).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
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
    const doSignUp = async (data: SignupValues) => {
        console.log('signup');
        console.log(data);
        console.log(event);
        onSuccess();
    };

    return (
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
                    <TextButton
                        text="Already have an account? Sign in"
                        path="/auth/signin"
                    />
                </>
            )}
        </Form>
    );
};
