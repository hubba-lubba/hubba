import { Pfp } from '@/components/elements';
import { Form, SubmitButton } from '@/components/form';
import { FieldWrapper } from '@/components/form/FieldWrapper';
import { useContext, useState } from 'react';
import { UserContext } from '@/contexts/UserProvider';
import { AnySchema } from 'joi';
import { UseFormSetError } from 'react-hook-form';
import { upload_image } from '@/lib/images';

type ChangeProfilePictureFields = {
    newProfilePicture: FileList;
};

export function ChangeProfilePicture() {
    const { userData, editProfileImage } = useContext(UserContext);
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer>(
        null!,
    );
    const [reqError, setReqError] = useState<string | null>(null);

    async function handleSubmit(data: ChangeProfilePictureFields) {
        const { newProfilePicture } = data;
        try {
            const image_url = await upload_image(newProfilePicture, 'user');
            await editProfileImage(image_url);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
            setReqError((error as Error).message);
        }
    }

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setError: UseFormSetError<ChangeProfilePictureFields>,
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size < 1 || file.size > 5 * 1024 * 1024) {
            setError('newProfilePicture', {
                type: 'manual',
                message:
                    'File size must be greater than 1 KB and less than 5 MB.',
            });
            return;
        }
        setPreviewImage(URL.createObjectURL(file));
    };

    return (
        <div className="flex w-3/6 flex-col items-center">
            <h2 className="mb-2 text-3xl">Change Profile Picture</h2>
            <Form<ChangeProfilePictureFields, AnySchema>
                onSubmit={handleSubmit}
            >
                {({ register, formState, setError }) => (
                    <>
                        <FieldWrapper
                            style="w-[300px] h-[300px] rounded-full cursor-pointer flex justify-center items-center"
                            error={formState.errors['newProfilePicture']}
                        >
                            {previewImage ? (
                                <img
                                    src={previewImage as string}
                                    alt="profile picture"
                                    className="rounded-full"
                                />
                            ) : (
                                <Pfp
                                    image={userData?.profile_image}
                                    size={300}
                                />
                            )}
                            <input
                                type="file"
                                id="profilePicture"
                                className="hidden"
                                accept="image/jpeg"
                                {...register('newProfilePicture', {
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
