import { Form, TextField, SubmitButton } from '@/components/form';
import { AuthLinks } from './AuthLinks';
import { TextButton } from '@/components/elements/buttons';
import { email, password } from '@/lib/validation';
import { signin } from '../api';
import Joi from 'joi';

const schema = Joi.object({
    email: email,
    password: password,
});

type SigninValues = {
    email: string;
    password: string;
};

type SigninFormProps = {
    onSuccess: () => void;
};

export const SigninForm = ({ onSuccess }: SigninFormProps) => {
    // add button functions here
    // const navigate = useNavigate();

    const doSignIn = async (data: SigninValues) => {
        const { email, password } = data;
        try {
            await signin(email, password);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
        onSuccess();
    };
    return (
        <>
            <Form<SigninValues, typeof schema>
                title="Sign In"
                onSubmit={doSignIn}
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
                            type="password"
                            label="Password"
                            error={formState.errors['password']}
                            registration={register('password')}
                        />
                        <SubmitButton text="Sign In" />
                    </>
                )}
            </Form>
            <AuthLinks>
                <TextButton
                    text="Dont have an account?"
                    anchortext="Sign up"
                    path="/auth/signup"
                    />
                <TextButton anchortext="Forgot password?" path="/auth/forgot" />
            </AuthLinks>
        </>
    );
};
