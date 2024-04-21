import { Form, TextField, SubmitButton } from '@/components/form';
import { channel } from '@/lib/validation';
import Joi from 'joi';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserProvider';

const schema = Joi.object({
    channel: channel,
});

type ChangeChannelValues = {
    channel: string;
};

export function ChangeChannel() {
    const { editChannel } = useContext(UserContext);

    async function handleSubmit(data: ChangeChannelValues) {
        const { channel } = data;
        try {
            await editChannel(channel);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-3xl">Update Channel</h2>
            <Form<ChangeChannelValues, typeof schema>
                onSubmit={handleSubmit}
                schema={schema}
                style="!w-1/2"
            >
                {({ register, formState }) => (
                    <>
                        <TextField
                            type="text"
                            label="Channel"
                            error={formState.errors['channel']}
                            registration={register('channel')}
                        />
                        <SubmitButton text="Submit" />
                    </>
                )}
            </Form>
        </div>
    );
}
