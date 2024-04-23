import { Layout } from '../layout/Layout';

type SubmitButtonProps = {
    text: string;
    layoutStyle?: string;
};

export const SubmitButton = ({ text, layoutStyle }: SubmitButtonProps) => {
    return (
        <Layout style={layoutStyle}>
            <button
                type="submit"
                className="h-11 w-5/12 cursor-pointer rounded-md bg-hubba-500 hover:bg-hubba-400"
            >
                {text}
            </button>
        </Layout>
    );
};
