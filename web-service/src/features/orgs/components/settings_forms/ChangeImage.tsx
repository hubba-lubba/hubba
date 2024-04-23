import { Form, SubmitButton } from '@/components/form';
import { FieldWrapper } from '@/components/form/FieldWrapper';
import { useContext, useState } from 'react';
import { UserContext } from '@/contexts/UserProvider';
import { AnySchema } from 'joi';
import { UseFormSetError } from 'react-hook-form';
import { upload_image } from '@/lib/images';
import { Org } from '../../types';

type ChangeImageFields = {
    newImage: FileList;
};

export function ChangeImage({ org }: { org: Org }) {
    const { editOrgImage } = useContext(UserContext);
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer>(
        null!,
    );
    const [reqError, setReqError] = useState<string | null>(null);

    async function handleSubmit(data: ChangeImageFields) {
        const { newImage } = data;
        try {
            const image_url = await upload_image(newImage, 'org');
            await editOrgImage(org.org_id, image_url);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
            setReqError((error as Error).message);
        }
    }

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setError: UseFormSetError<ChangeImageFields>,
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size < 1 || file.size > 10 * 1024 * 1024) {
            setError('newImage', {
                type: 'manual',
                message:
                    'File size must be greater than 1 KB and less than 10 MB.',
            });
            return;
        }
        setPreviewImage(URL.createObjectURL(file));
    };

    return (
        <div className="flex w-3/6 flex-col items-center">
            <h2 className="mb-2 text-xl">Org Image</h2>
            <Form<ChangeImageFields, AnySchema> onSubmit={handleSubmit}
            style="w-full flex flex-col justify-center items-center">
                {({ register, formState, setError }) => (
                    <>
                        <FieldWrapper
                            style="w-[200px] h-[200px] rounded-full cursor-pointer flex justify-center items-center"
                            error={formState.errors['newImage']}
                        >
                            <img
                                src={(previewImage as string) ?? org.image}
                                alt={org.name}
                            />
                            <input
                                type="file"
                                id="image"
                                className="hidden"
                                accept="image/jpeg"
                                {...register('newImage', {
                                    required: 'Please choose a file.',
                                    onChange: (e) =>
                                        handleFileChange(e, setError),
                                })}
                            />
                        </FieldWrapper>
                        <SubmitButton layoutStyle="flex w-full justify-center" text="Submit" />
                    </>
                )}
            </Form>
            {reqError && <p className="text-red-500">{reqError}</p>}
        </div>
    );
}
