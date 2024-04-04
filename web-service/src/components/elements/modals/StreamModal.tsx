import { useContext } from 'react';
import { Modal } from '..';
import { Form, TextField, SubmitButton } from '@/components/form';
import { ModalContext } from '@/contexts/ModalProvider';
import Joi from 'joi';
import { Layout } from '@/components/layout';

const schema = Joi.object({
    url: Joi.string().uri().required(),
});

type StreamFormValues = {
    url: string;
};

export const StreamModal = () => {
    const { showStreamModal, setShowStreamModal } = useContext(ModalContext);
    const addVideo = async (data: StreamFormValues) => {
        console.log(data);
        setShowStreamModal(false);
    };

    return (
        <Modal showState={[showStreamModal, setShowStreamModal]}>
            <Layout style="items-center justify-center h-full">
                <Form<StreamFormValues, typeof schema>
                    title="Link a Stream"
                    onSubmit={addVideo}
                    schema={schema}
                >
                    {({ register, formState }) => (
                        <>
                            <TextField
                                type="url"
                                label="Stream URL"
                                error={formState.errors['url']}
                                registration={register('url')}
                            />
                            <SubmitButton text="Link Stream" />
                        </>
                    )}
                </Form>
            </Layout>
        </Modal>
    );
};
