import { Form, TextField, SubmitButton } from '@/components/form';
import { UserContext } from '@/contexts/UserProvider';
import { name } from '@/lib/validation';
import Joi from 'joi';
import { useContext } from 'react';
import { Org } from '../../types';

const schema = Joi.object({
    newName: name,
});

type ChangeNameFields = {
    newName: string;
};

export function ChangeName({ org }: { org: Org }) {
    const { editOrgName } = useContext(UserContext);

    async function handleSubmit(data: ChangeNameFields) {
        const { newName } = data;
        try {
            await editOrgName(org.org_id, newName);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-xl">Org Name</h2>
            <Form<ChangeNameFields, typeof schema>
                onSubmit={handleSubmit}
                schema={schema}
            >
                {({ register, formState }) => (
                    <>
                        <TextField
                            type="text"
                            label="Name"
                            defaultValue={org.name}
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
