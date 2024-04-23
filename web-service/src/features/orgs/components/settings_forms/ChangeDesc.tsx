import { Form, TextField, SubmitButton } from '@/components/form';
import { desc } from '@/lib/validation';
import Joi from 'joi';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserProvider';
import { Org } from '../../types';

const schema = Joi.object({
    desc: desc,
});

type ChangeDescValues = {
    desc: string;
};

export function ChangeDesc({ org }: { org: Org }) {
    const { editOrgDesc } = useContext(UserContext);

    async function handleSubmit(data: ChangeDescValues) {
        const { desc } = data;
        try {
            await editOrgDesc(org.org_id, desc);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-xl">Bio</h2>
            <Form<ChangeDescValues, typeof schema>
                onSubmit={handleSubmit}
                schema={schema}
            >
                {({ register, formState }) => (
                    <>
                        <TextField
                            type="text"
                            label="Bio"
                            error={formState.errors['desc']}
                            registration={register('desc')}
                        />
                        <SubmitButton text="Submit" />
                    </>
                )}
            </Form>
        </div>
    );
}
