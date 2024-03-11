import { Form, SubmitButton, TextField } from '@/components/form';
import Joi from 'joi';

const schema = Joi.object({
    email: Joi.string().min(1).required(),
});

type ForgotValues = {
    email: string;
    password: string;
};

type ForgotFormProps = {
    onSuccess: () => void;
};

export const ForgotPasswordForm = ({ onSuccess }: ForgotFormProps) => {
    // add button functions here
    const doForgotPassword = async(data: ForgotValues) => {}

    return (
        <Form<ForgotValues, typeof schema> title="Forgot Password" onSubmit={doForgotPassword} schema={schema}>
            {({ register, formState }) => (
                <>
                    <TextField type="email" label="Email Address" error={formState.errors['email']} registration={register('email')} />
                    <SubmitButton text="Send Code" />
                </>
            )}
        </Form>
    );
};
