import { Form, SubmitButton } from '@/components/form';
import { FieldWrapper } from '@/components/form/FieldWrapper';
import { AnySchema } from 'joi'

type ChangeProfilePictureFields = {
    newProfilePicture: File;
};

export function ChangeProfilePicture() {
    async function handleSubmit(data: ChangeProfilePictureFields) {
        const { newProfilePicture } = data;
        try {
            console.log(`new pfp: ${newProfilePicture}`);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-3xl">Change Profile Picture</h2>
            <Form<ChangeProfilePictureFields, AnySchema>
                onSubmit={handleSubmit}
            >
                {({ register, formState }) => (
                    <>
                        <FieldWrapper
                            style="bg-neutral-500 w-[300px] h-[300px] rounded-full"
                            error={formState.errors['newProfilePicture']}
                        >
                            <input
                                type="file"
                                id="profilePicture"
                                className="hidden"
                                accept="image/*"
                                {...register('newProfilePicture', {
                                    //include other pfp file requirements
                                    required: "Please choose a file."
                                })}
                            />
                        </FieldWrapper>
                        <SubmitButton text="Submit" />
                    </>
                )}
            </Form>
        </div>
    )
}
