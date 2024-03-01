import { Form, TextField, SubmitButton } from '@/components/form';
import { TextButton } from '@/components/elements/buttons';

export const SignupForm = () => {
    return (
        <Form title="Sign Up">
            <TextField type="text" label="Email Address" required={true} />
            <TextField type="text" label="Username" required={true} />
            <TextField type="password" label="Password" required={true} />
            <TextField
                type="password"
                label="Confirm Password"
                required={true}
            />
            <SubmitButton text="Sign Up" />
            <TextButton
                text="Already have an account? Sign in"
                path="/signin"
            />
        </Form>
    );
};
