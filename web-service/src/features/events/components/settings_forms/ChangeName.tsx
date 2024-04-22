import { Form, TextField, SubmitButton } from '@/components/form';
import { UserContext } from '@/contexts/UserProvider';
import { name } from '@/lib/validation';
import Joi from 'joi';
import { useContext } from 'react';
import { Event } from '../../types';

const schema = Joi.object({
    newName: name,
});

type ChangeNameFields = {
    newName: string;
};

export function ChangeName({ event }: { event: Event }) {
    const { editEventName } = useContext(UserContext);

    async function handleSubmit(data: ChangeNameFields) {
        const { newName } = data;
        try {
            await editEventName(event.event_id, newName);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-3xl">Change Event Name</h2>
            <Form<ChangeNameFields, typeof schema>
                onSubmit={handleSubmit}
                schema={schema}
                style="!w-1/2"
            >
                {({ register, formState }) => (
                    <>
                        <TextField
                            value={event.name}
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
