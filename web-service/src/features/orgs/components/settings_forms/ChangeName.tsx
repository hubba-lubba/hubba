import { Form, TextField, SubmitButton } from '@/components/form';
import { UserContext } from '@/contexts/UserProvider';
import { name } from '@/lib/validation';
import Joi from 'joi';
import { useContext } from 'react';

const schema = Joi.object({
    newName: name,
});

type ChangeUsernameFields = {
    newName: string;
};

export function ChangeName() {
    const { editUsername } = useContext(UserContext);

    async function handleSubmit(data: ChangeUsernameFields) {
        const { newName } = data;
        try {
            await editUsername(newName);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-3xl">Change Org Name</h2>
            <Form<ChangeUsernameFields, typeof schema>
                onSubmit={handleSubmit}
                schema={schema}
                style="!w-1/2"
            >
                {({ register, formState }) => (
                    <>
                        <TextField
                            type="text"
                            label="New Name"
                            error={formState.errors['newName']}
                            registration={register('newName')}
                        />
                        <SubmitButton text="Submit" />
                    </>
                )}
            </Form>
        </div>
    );
}
