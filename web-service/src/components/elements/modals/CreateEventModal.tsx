import { useContext, useEffect, useState } from 'react';
import { Modal } from '..';
import { Form, TextField, SubmitButton } from '@/components/form';
import { ModalContext } from '@/contexts/ModalProvider';
import Joi from 'joi';
import { Layout } from '@/components/layout';
import { UserContext } from '@/contexts/UserProvider';
import { name, desc } from '@/lib/validation';
import { SelectField, DateField } from '@/components/form';
import { Org } from '@/features/orgs/types';
import { get_user_orgs } from '@/features/orgs/api';
import { create_event } from '@/features/events/api';

const prize = Joi.string().min(3).max(30).allow('');

const schema = Joi.object({
    name: name,
    host_org: Joi.required(),
    description: desc,
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
    url?: string;
    time_of: Date;
    prize1?: string;
    prize2?: string;
    prize3?: string;
};

export const CreateEventModal = () => {
    const [orgs, setOrgs] = useState<Org[]>([]);
    const { showCreateEventModal, setShowCreateEventModal } =
        useContext(ModalContext);
    const { userData, userEvents, setUserEvents } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const userOrgs = await get_user_orgs();
            setOrgs(userOrgs);
        };
        if (userData) fetchData();
    }, [userData]);

    const handleSubmit = async (data: CreateEventValues) => {
        const {
            name,
            host_org,
            time_of,
            description,
            url,
            prize1,
            prize2,
            prize3,
        } = data;

        // cringe methods TT
        const prizes = [];
        if (prize1) prizes.push(prize1);
        if (prize2) prizes.push(prize2);
        if (prize3) prizes.push(prize3);
        const host_org_id = host_org.split(' - ')[1];

        const eventData = await create_event(
            name,
            host_org_id,
            time_of,
            description,
            url,
            prizes,
        );
        setUserEvents([...userEvents, eventData]);
        setShowCreateEventModal(false);
    };

    return (
        <Modal
            showState={[showCreateEventModal, setShowCreateEventModal]}
            className="h-[600px] !w-[1500px]"
        >
            <Layout style="items-center justify-center h-full w-full">
                <Form<CreateEventValues, typeof schema>
                    title="Create an Event"
                    style="w-full"
                    onSubmit={handleSubmit}
                    schema={schema}
                >
                    {({ register, formState }) => (
                        <div className="flex w-full flex-row justify-center space-x-4">
                            <div className="flex w-1/4 flex-col">
                                <SelectField
                                    // TODO: implement having select displayed options be different from underlying value
                                    options={orgs.map(
                                        (org) => `${org.name} - ${org.org_id}`,
                                    )}
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
                                <SubmitButton text="Create Event" />
                            </div>
                        </div>
                    )}
                </Form>
            </Layout>
        </Modal>
    );
};
