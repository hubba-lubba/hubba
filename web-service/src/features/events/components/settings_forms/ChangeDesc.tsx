import { Form, TextField, SubmitButton } from '@/components/form';
import { desc } from '@/lib/validation';
import Joi from 'joi';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserProvider';
import { Event } from '../../types';

const schema = Joi.object({
    desc: desc,
});

type ChangeDescValues = {
    desc: string;
};

export function ChangeDesc({ event }: { event: Event }) {
    const { editEventDesc } = useContext(UserContext);

    async function handleSubmit(data: ChangeDescValues) {
        const { desc } = data;
        try {
            await editEventDesc(event.event_id, desc);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-xl">Description</h2>
            <Form<ChangeDescValues, typeof schema>
                onSubmit={handleSubmit}
                schema={schema}
            >
                {({ register, formState }) => (
                    <>
                        <TextField
                            defaultValue={event.description}
                            type="text"
                            label="Description"
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
