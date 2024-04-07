import { useContext } from 'react';
import { Modal } from '..';
import { Form, TextField, SubmitButton } from '@/components/form';
import { ModalContext } from '@/contexts/ModalProvider';
import Joi from 'joi';
import { Layout } from '@/components/layout';
import { UserContext } from '@/contexts/UserProvider';
import { name, channel, desc } from '@/lib/validation';
import { createEvent } from '@/features/events/api';
import { Event } from '@/features/events/types';
import { SelectField, DateField } from '@/components/form';

const prize = Joi.string().min(3).max(30).allow('');

const schema = Joi.object({
    name: name,
    host_org: Joi.required(),
    description: desc,
    channel: channel,
    url: Joi.string().uri().allow(''),
    time_of: Joi.date().required(),
    prize1: prize,
    prize2: prize,
    prize3: prize,
});

type CreateEventValues = {
    name: string;
    host_org: string;
    description?: string;
    channel?: string;
    url?: string;
    time_of: Date;
    prize1: string;
    prize2: string;
    prize3: string;
};

export const CreateEventModal = () => {
    const { showCreateEventModal, setShowCreateEventModal } =
        useContext(ModalContext);
    const { userData, joinEvent } = useContext(UserContext);

    const handleSubmit = async (data: CreateEventValues) => {
        const {
            name,
            host_org,
            description,
            channel,
            url,
            time_of,
            prize1,
            prize2,
            prize3,
        } = data;

        console.log(data);

        const event = new Event(
            `id ${name}`,
            host_org,
            name,
            '',
            description ?? '',
            channel ?? '',
            url ?? '',
            'Twitch',
            [],
            time_of,
            1,
            [prize1, prize2, prize3],
        );
        createEvent(event);
        joinEvent(event.event_id);

        setShowCreateEventModal(false);
    };

    return (
        <Modal
            showState={[showCreateEventModal, setShowCreateEventModal]}
            className="h-[600px] w-[1500px]"
        >
            <Layout style="items-center justify-center h-full w-full">
                <Form<CreateEventValues, typeof schema>
                    title="Create an Organization"
                    style="w-full"
                    onSubmit={handleSubmit}
                    schema={schema}
                >
                    {({ register, formState }) => (
                        <div className="flex w-full flex-row justify-center space-x-4">
                            <div className="flex w-1/4 flex-col">
                                <SelectField
                                    options={userData.owned_orgs}
                                    label="Organization"
                                    error={formState.errors['host_org']}
                                    registration={register('host_org')}
                                />
                                <TextField
                                    type="text"
                                    label="Name*"
                                    error={formState.errors['name']}
                                    registration={register('name')}
                                />
                                <TextField
                                    type="text"
                                    label="Description"
                                    error={formState.errors['description']}
                                    registration={register('description')}
                                />
                                <TextField
                                    type="text"
                                    label="Channel"
                                    error={formState.errors['channel']}
                                    registration={register('channel')}
                                />
                                <TextField
                                    type="url"
                                    label="Url"
                                    error={formState.errors['url']}
                                    registration={register('url')}
                                />
                            </div>
                            <div className="flex w-1/4 flex-col">
                                <DateField
                                    label="Time (UTC)"
                                    error={formState.errors['time_of']}
                                    registration={register('time_of')}
                                />
                                <TextField
                                    type="text"
                                    label="Prize 1"
                                    error={formState.errors['prize1']}
                                    registration={register('prize1')}
                                />
                                <TextField
                                    type="text"
                                    label="Prize 2"
                                    error={formState.errors['prize2']}
                                    registration={register('prize2')}
                                />
                                <TextField
                                    type="text"
                                    label="Prize 3"
                                    error={formState.errors['prize3']}
                                    registration={register('prize3')}
                                />
                                <br />
                                <SubmitButton text="Create Org" />
                            </div>
                        </div>
                    )}
                </Form>
            </Layout>
        </Modal>
    );
};
