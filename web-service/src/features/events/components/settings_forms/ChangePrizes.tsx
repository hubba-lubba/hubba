import { Form, TextField, SubmitButton } from '@/components/form';
import { UserContext } from '@/contexts/UserProvider';
import Joi from 'joi';
import { useContext } from 'react';
import { Event } from '../../types';

const prize = Joi.string().min(3).max(30).allow('');

const schema = Joi.object({
    prize1: prize,
    prize2: prize,
    prize3: prize,
});

type ChangePrizesFields = {
    prize1: string;
    prize2: string;
    prize3: string;
};

export function ChangePrizes({ event }: { event: Event }) {
    const { editEventPrizes } = useContext(UserContext);

    async function handleSubmit(data: ChangePrizesFields) {
        const { prize1, prize2, prize3 } = data;
        const prizes = [prize1, prize2, prize3];
        try {
            await editEventPrizes(event.event_id, prizes);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-3xl">Change Event Prizes</h2>
            <Form<ChangePrizesFields, typeof schema>
                onSubmit={handleSubmit}
                schema={schema}
            >
                {({ register, formState }) => (
                    <>
                        <TextField
                            value={event.prizes?.[0]}
                            type="text"
                            label="Prize 1"
                            error={formState.errors['prize1']}
                            registration={register('prize1')}
                        />
                        <TextField
                            value={event.prizes?.[1]}
                            type="text"
                            label="Prize 2"
                            error={formState.errors['prize2']}
                            registration={register('prize2')}
                        />
                        <TextField
                            value={event.prizes?.[2]}
                            type="text"
                            label="Prize 3"
                            error={formState.errors['prize3']}
                            registration={register('prize3')}
                        />
                        <SubmitButton text="Submit" />
                    </>
                )}
            </Form>
        </div>
    );
}
