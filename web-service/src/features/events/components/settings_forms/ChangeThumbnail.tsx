import { Form, SubmitButton } from '@/components/form';
import { FieldWrapper } from '@/components/form/FieldWrapper';
import { useContext, useState } from 'react';
import { UserContext } from '@/contexts/UserProvider';
import { AnySchema } from 'joi';
import { UseFormSetError } from 'react-hook-form';
import { upload_image } from '@/lib/images';
import { Event } from '../../types';

type ChangeThumbnailFields = {
    newThumbnail: File;
};

export function ChangeThumbnail({ event }: { event: Event }) {
    const { editEventThumbnail } = useContext(UserContext);
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer>(
        null!,
    );
    const [reqError, setReqError] = useState<string | null>(null);

    async function handleSubmit(data: ChangeThumbnailFields) {
        const { newThumbnail } = data;
        try {
            const image_url = await upload_image(newThumbnail, 'event');
            await editEventThumbnail(event.event_id, image_url);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
            setReqError((error as Error).message);
        }
    }

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setError: UseFormSetError<ChangeThumbnailFields>,
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size < 1 || file.size > 20 * 1024 * 1024) {
            setError('newThumbnail', {
                type: 'manual',
                message:
                    'File size must be greater than 1 KB and less than 20 MB.',
            });
            return;
        }
        setPreviewImage(URL.createObjectURL(file));
    };

    return (
        <div className="flex w-3/6 flex-col items-center">
            <h2 className="mb-2 text-3xl">Change Event Thumbnail</h2>
            <Form<ChangeThumbnailFields, AnySchema> onSubmit={handleSubmit}>
                {({ register, formState, setError }) => (
                    <>
                        <FieldWrapper
                            style="w-[300px] h-[300px] rounded-full cursor-pointer"
                            error={formState.errors['newThumbnail']}
                        >
                            <img
                                src={
                                    (previewImage as string) ?? event.thumbnail
                                }
                                alt="profile picture"
                                className="h-[300px] w-[300px] rounded-full"
                            />
                            <input
                                type="file"
                                id="thumbnail"
                                className="hidden"
                                accept="image/jpeg"
                                {...register('newThumbnail', {
                                    required: 'Please choose a file.',
                                    onChange: (e) =>
                                        handleFileChange(e, setError),
                                })}
                            />
                        </FieldWrapper>
                        <SubmitButton text="Submit" />
                    </>
                )}
            </Form>
            {reqError && <p className="text-red-500">{reqError}</p>}
        </div>
    );
}
