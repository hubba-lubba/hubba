import { Form, TextField, SubmitButton } from '@/components/form';
import { desc } from '@/lib/validation';
import Joi from 'joi';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserProvider';

const schema = Joi.object({
    bio: desc,
});

type ChangeBioValues = {
    bio: string;
};

export function ChangeBio() {
    const { editBio } = useContext(UserContext);

    async function handleSubmit(data: ChangeBioValues) {
        const { bio } = data;
        try {
            await editBio(bio);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-xl">Bio</h2>
            <Form<ChangeBioValues, typeof schema>
                onSubmit={handleSubmit}
                schema={schema}
            >
                {({ register, formState }) => (
                    <>
                        <TextField
                            type="text"
                            label="Bio"
                            error={formState.errors['bio']}
                            registration={register('bio')}
                        />
                        <SubmitButton text="Submit" />
                    </>
                )}
            </Form>
        </div>
    );
}
