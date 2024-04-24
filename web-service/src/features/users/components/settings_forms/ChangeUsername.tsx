import { Form, TextField, SubmitButton } from '@/components/form';
import { AuthContext } from '@/contexts/AuthProvider';
import { UserContext } from '@/contexts/UserProvider';
import { username } from '@/lib/validation';
import Joi from 'joi';
import { useContext } from 'react';

const schema = Joi.object({
    newUsername: username,
});

type ChangeUsernameFields = {
    newUsername: string;
};

export function ChangeUsername() {
    const currentUser = useContext(AuthContext);
    const { userData, editUsername } = useContext(UserContext);

    async function handleSubmit(data: ChangeUsernameFields) {
        const { newUsername } = data;
        try {
            await editUsername(newUsername);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-xl">Username</h2>
            <Form<ChangeUsernameFields, typeof schema>
                onSubmit={handleSubmit}
                schema={schema}
            >
                {({ register, formState }) => (
                    <>
                        <TextField
                            type="text"
                            // TODO: add 'New' to all these after componentize
                            label="Username"
                            defaultValue={
                                userData.username ?? currentUser.displayName
                            }
                            error={formState.errors['newUsername']}
                            registration={register('newUsername')}
                        />
                        <SubmitButton text="Submit" />
                    </>
                )}
            </Form>
        </div>
    );
}
