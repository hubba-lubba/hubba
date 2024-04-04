import { Form } from "@/components/form/Form"
import { SubmitButton } from "@/components/form/SubmitButton"
import { FieldWrapper } from "@/components/form/FieldWrapper"
import { AnySchema } from "joi"

type ChangeBioFields = {
    bio: string
}

export function ChangeBio() {
    async function handleSubmit() {
    }

    return (
        <div>
            <h2 className="mb-2 text-3xl">Update Bio</h2>
            <Form<ChangeBioFields, AnySchema>
                onSubmit={handleSubmit}
            >
                {({ register, formState }) => (
                    <>
                        <FieldWrapper
                            error={formState.errors['bio']}
                        >
                            <textarea
                                className="w-full h-[200px] text-hubba-900"
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
