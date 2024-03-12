import { Layout } from '../layout/Layout';

type SubmitButtonProps = {
    text: string;
};

export const SubmitButton = ({ text }: SubmitButtonProps) => {
    return (
        <Layout>
            <button
                type="submit"
                className="h-11 w-5/12 cursor-pointer rounded-md bg-hubba-500 hover:bg-hubba-400"
            >
                {text}
            </button>
        </Layout>
    );
};
