import { Form, SubmitButton } from '@/components/form';
import { FieldWrapper } from '@/components/form/FieldWrapper';

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
            <h2 className="mb-2 text-3xl">Change Email</h2>
            <Form<ChangeProfilePictureFields>
                onSubmit={handleSubmit}
            >
                {({ register, formState }) => (
                    <FieldWrapper
                        label="Choose File"
                        error={formState.errors['newProfilePicture']}
                        children={
                            <>
                                <input
                                    type="file"
                                    {...register('newProfilePicture', { required: true })}
                                />
                                <SubmitButton text="Submit" />
                            </>
                        }
                    >
                    </FieldWrapper>
                )}
            </Form>
        </div>
    )
}
