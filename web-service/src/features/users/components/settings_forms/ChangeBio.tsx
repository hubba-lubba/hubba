import { Form } from "@/components/form/Form"
import { SubmitButton } from "@/components/form/SubmitButton"
import { FieldWrapper } from "@/components/form/FieldWrapper"
import { AnySchema } from "joi"

type ChangeBioFields = {
    bio: string
}

export function ChangeBio() {
    async function handleSubmit(data: ChangeBioFields) {
        const { bio } = data
        try {
            console.log(`new bio: ${bio}`);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    return (
        <div>
            <h2 className="mb-2 text-3xl">Update Bio</h2>
            <Form<ChangeBioFields, AnySchema>
                onSubmit={handleSubmit}
                style="lg:w-[500px]"
            >
                {({ register, formState }) => (
                    <>
                        <FieldWrapper
                            error={formState.errors['bio']}
                        >
                            <textarea
                                className="w-full h-[200px] max-h-[400px] text-hubba-900"
                                {...register('bio')}
                            />
                        </FieldWrapper>
                        <SubmitButton text="Submit" />
                    </>
                )}
            </Form>
        </div>
    )
}
