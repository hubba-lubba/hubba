import { Pfp } from '@/components/elements';
import { Form, SubmitButton } from '@/components/form';
import { FieldWrapper } from '@/components/form/FieldWrapper';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserProvider';
import { AnySchema } from 'joi';

type ChangeProfilePictureFields = {
    newProfilePicture: FileList;
};

export function ChangeProfilePicture() {
    const { userData } = useContext(UserContext);

    async function handleSubmit(data: ChangeProfilePictureFields) {
        const { newProfilePicture } = data;
        // TODO: implement (hold link to google cloud storage)
        try {
            console.log(`new pfp: ${newProfilePicture.item(0)}`);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div className="flex w-3/6 flex-col items-center">
            <h2 className="mb-2 text-3xl">Change Profile Picture</h2>
            <Form<ChangeProfilePictureFields, AnySchema>
                onSubmit={handleSubmit}
            >
                {({ register, formState }) => (
                    <>
                        <FieldWrapper
                            style="w-[300px] h-[300px] rounded-full cursor-pointer"
                            error={formState.errors['newProfilePicture']}
                        >
                            <Pfp image={userData?.profile_image} size={300} />
                            <input
                                type="file"
                                id="profilePicture"
                                className="hidden"
                                accept="image/*"
                                {...register('newProfilePicture', {
                                    //include other pfp file requirements
                                    required: 'Please choose a file.',
                                })}
                            />
                        </FieldWrapper>
                        <SubmitButton text="Submit" />
                    </>
                )}
            </Form>
        </div>
    );
}
