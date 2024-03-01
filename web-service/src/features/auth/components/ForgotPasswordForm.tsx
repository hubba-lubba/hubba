import { Form, SubmitButton, TextField } from '@/components/form';

export const ForgotPasswordForm = () => {
    // add button functions here
    return (
        <Form title="Forgot Password">
            <TextField type="text" label="Email Address" required={true} /> 
            <SubmitButton text="Send Code" />
        </Form>
    );
}
