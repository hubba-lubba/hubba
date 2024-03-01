import { Form, TextField, SubmitButton } from '@/components/form';
import { TextButton } from '@/components/elements/buttons';


export const SigninForm = () => {
    // add button functions here
    return (
        <Form title="Sign In">
            <TextField type="text" label="Username" required={true} />
            <TextField type="password" label="Password" required={true} />
            <SubmitButton text="Sign In" />
            <TextButton text="Forgot password?" path="/forgot" />
            <TextButton text="Dont have an account? Sign up" path="/signup" />
        </Form>
    );
}
