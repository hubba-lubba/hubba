import { Form, TextField, SubmitButton } from '@/components/form';
import { UserContext } from '@/contexts/UserProvider';
import Joi from 'joi';
import { useContext } from 'react';
import { Event } from '../../types';

const schema = Joi.object({
    newUrl: Joi.string().uri().required(),
});

type ChangeUrlFields = {
    newUrl: string;
};

export function ChangeUrl({ event }: { event: Event }) {
    const { editEventUrl } = useContext(UserContext);

    async function handleSubmit(data: ChangeUrlFields) {
        const { newUrl } = data;
        try {
            await editEventUrl(event.event_id, newUrl);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-3xl">Change Event Url</h2>
            <Form<ChangeUrlFields, typeof schema>
                onSubmit={handleSubmit}
                schema={schema}
                style="!w-1/2"
            >
                {({ register, formState }) => (
                    <>
                        <TextField
                            type="text"
                            label="New Url"
                            error={formState.errors['newUrl']}
                            registration={register('newUrl')}
                        />
                        <SubmitButton text="Submit" />
                    </>
                )}
            </Form>
        </div>
    );
}
