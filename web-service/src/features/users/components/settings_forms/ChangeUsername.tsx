import { Form, TextField, SubmitButton } from '@/components/form';
import { username } from '@/lib/validation';
import Joi from 'joi';

const schema = Joi.object({
    newUsername: username,
});

type ChangeUsernameFields = {
    newUsername: string;
};

export function ChangeUsername() {
    async function handleSubmit(data: ChangeUsernameFields) {
        const { newUsername } = data;
        try {
            console.log(`new username : ${newUsername}`);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-3xl">Change Username</h2>
            <Form<ChangeUsernameFields, typeof schema>
                onSubmit={handleSubmit}
                schema={schema}
            >
                {({ register, formState }) => (
                    <>
                        <TextField
                            type="username"
                            label="New Username"
                            error={formState.errors['newUsername']}
                            registration={register('newUsername')}
                        />
                        <SubmitButton text="Submit" />
                    </>
                )}
            </Form>
        </div>
    )
}
