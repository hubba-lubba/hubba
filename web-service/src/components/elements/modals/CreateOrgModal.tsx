import { useContext } from 'react';
import { Modal } from '..';
import { Form, TextField, SubmitButton } from '@/components/form';
import { ModalContext } from '@/contexts/ModalProvider';
import Joi from 'joi';
import { Layout } from '@/components/layout';
import { UserContext } from '@/contexts/UserProvider';
import { channel, name, desc } from '@/lib/validation';
import { Org } from '@/features/orgs/types';
import { OrgsContext } from '@/contexts/OrgsProvider';

const schema = Joi.object({
    name: name,
    description: desc,
    channel: channel,
});

type CreateOrgValues = {
    name: string;
    description?: string;
    channel?: string;
};

export const CreateOrgModal = () => {
    const { showCreateOrgModal, setShowCreateOrgModal } =
        useContext(ModalContext);
    const { userData, addOrgToUser } = useContext(UserContext);
    const { createOrg } = useContext(OrgsContext);

    const handleSubmit = async (data: CreateOrgValues) => {
        const { name, description, channel } = data;
        const org = new Org(
            `id ${name}`,
            name,
            'https://via.placeholder.com/250',
            description ?? '',
            channel ?? '',
            [],
            userData.user_id,
            [],
            [userData.user_id],
            [],
            new Date(),
        );
        await createOrg(org);
        await addOrgToUser(org.org_id, true);

        setShowCreateOrgModal(false);
    };

    return (
        <Modal
            showState={[showCreateOrgModal, setShowCreateOrgModal]}
            className="h-[600px]"
        >
            <Layout style="items-center justify-center h-full">
                <Form<CreateOrgValues, typeof schema>
                    title="Create an Organization"
                    onSubmit={handleSubmit}
                    schema={schema}
                >
                    {({ register, formState }) => (
                        <>
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
                            <SubmitButton text="Create Org" />
                        </>
                    )}
                </Form>
            </Layout>
        </Modal>
    );
};
