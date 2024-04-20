import { useContext } from 'react';
import { Modal } from '..';
import { Form, TextField, SubmitButton } from '@/components/form';
import { ModalContext } from '@/contexts/ModalProvider';
import Joi from 'joi';
import { Layout } from '@/components/layout';
import { UserContext } from '@/contexts/UserProvider';
import { channel, name, desc } from '@/lib/validation';
import { Org } from '@/features/orgs/types';
import { create_org } from '@/features/orgs/api';

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
    const { userData, userOrgs, setUserOrgs } = useContext(UserContext);

    const handleSubmit = async (data: CreateOrgValues) => {
        const { name, description, channel } = data;
        // TODO: what to pass in for create_org?
        const org = new Org(
            `id ${name}`,
            name,
            'https://via.placeholder.com/250',
            description ?? '',
            channel ?? '',
            userData.user_id,
            [],
            [userData.user_id],
            [],
        );
        const orgData = await create_org(org);
        setUserOrgs([...userOrgs, orgData])
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
