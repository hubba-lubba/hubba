import { Form, TextField, SubmitButton } from '@/components/form';
import { TextButton } from '@/components/elements/buttons';
import { email, password } from '@/lib/validation';
import { signin } from '@/lib/auth';
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
        } catch (error: any) {
            console.log(`Error: ${error.message}`);
        }
        onSuccess();
    };
    return (
        <div>
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
            <TextButton text="Forgot password?" path="/auth/forgot" />
            <TextButton
                text="Dont have an account? Sign up"
                path="/auth/signup"
            />
        </div>
    );
};
