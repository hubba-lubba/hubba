import { TextButton } from '@/components/elements/buttons';
import { Form, SubmitButton, TextField } from '@/components/form';
import { AuthLinks } from './AuthLinks';
import { email } from '@/lib/validation';
import Joi from 'joi';

const schema = Joi.object({
    email: email,
});

type ForgotValues = {
    email: string;
};

type ForgotFormProps = {
    onSuccess: () => void;
};

export const ForgotPasswordForm = ({ onSuccess }: ForgotFormProps) => {
    // add button functions here
    // TODO: implement
    const doForgotPassword = async (data: ForgotValues) => {
        console.log(data);
        onSuccess();
    };

    return (
        <>
            <Form<ForgotValues, typeof schema>
                style="my-auto"
                title="Forgot Password"
                onSubmit={doForgotPassword}
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
                        <SubmitButton text="Send Code" />
                    </>
                )}
            </Form>
            <AuthLinks>
                <TextButton
                    text="Didn't?"
                    anchortext="Sign In"
                    path="/auth/signin"
                />
            </AuthLinks>
        </>
    );
};
