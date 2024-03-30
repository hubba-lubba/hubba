import { useContext } from 'react';
import { Modal } from '..';
import { Form, TextField, SubmitButton } from '@/components/form';
import { ModalContext } from '@/contexts/ModalProvider';
import Joi from 'joi';
import { Layout } from '@/components/layout';

const schema = Joi.object({
    url: Joi.string().uri().required(),
});

type UploadFormValues = {
    url: string;
};

export const UploadModal = () => {
    const { showUploadModal, setShowUploadModal } = useContext(ModalContext);
    const addVideo = async (data: UploadFormValues) => {
        console.log(data);
        setShowUploadModal(false);
    };

    return (
        <Modal showState={[showUploadModal, setShowUploadModal]}>
            <Layout style="items-center justify-center h-full">
                <Form<UploadFormValues, typeof schema>
                    title="Link a Video"
                    onSubmit={addVideo}
                    schema={schema}
                >
                    {({ register, formState }) => (
                        <>
                            <TextField
                                type="url"
                                label="Video URL"
                                error={formState.errors['url']}
                                registration={register('url')}
                            />
                            <SubmitButton text="Add Video" />
                        </>
                    )}
                </Form>
            </Layout>
        </Modal>
    );
};
