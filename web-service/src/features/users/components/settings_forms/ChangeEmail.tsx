import { Form, TextField, SubmitButton } from '@/components/form';
import { email } from '@/lib/validation';
import Joi from 'joi';

const schema = Joi.object({
    newEmail: email,
});

type ChangeEmailFields = {
    newEmail: string;
};

export function ChangeEmail() {
    async function handleSubmit(data: ChangeEmailFields) {
        const { newEmail } = data;
        try {
            console.log(`new email: ${newEmail}`);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-3xl">Change Email</h2>
            <Form<ChangeEmailFields, typeof schema>
                onSubmit={handleSubmit}
                schema={schema}
            >
                {({ register, formState }) => (
                    <>
                        <TextField
                            type="email"
                            label="New Email"
                            error={formState.errors['newEmail']}
                            registration={register('newEmail')}
                        />
                        <SubmitButton text="Submit" />
                    </>
                )}
            </Form>
        </div>
    )
}
