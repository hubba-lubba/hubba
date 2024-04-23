import { Form, SubmitButton, DateField } from '@/components/form';
import { UserContext } from '@/contexts/UserProvider';
import Joi from 'joi';
import { useContext } from 'react';
import { Event } from '../../types';

const schema = Joi.object({
    time_of: Joi.date().required(),
});

type ChangeTimeFields = {
    time_of: Date;
};

export function ChangeTime({ event }: { event: Event }) {
    const { editEventTime } = useContext(UserContext);

    async function handleSubmit(data: ChangeTimeFields) {
        const { time_of } = data;
        try {
            await editEventTime(event.event_id, time_of);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-3xl">Change Event Time</h2>
            <Form<ChangeTimeFields, typeof schema>
                onSubmit={handleSubmit}
                schema={schema}
            >
                {({ register, formState }) => (
                    <>
                        <DateField
                            value={event.time_of}
                            label="New Time (UTC)"
                            error={formState.errors['time_of']}
                            registration={register('time_of')}
                        />
                        <SubmitButton text="Submit" />
                    </>
                )}
            </Form>
        </div>
    );
}
