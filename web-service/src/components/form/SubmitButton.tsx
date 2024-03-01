type SubmitButtonProps = {
    text: string;
};

export const SubmitButton = ({ text }: SubmitButtonProps) => {
    return (
        <button type="submit" className="cursor-pointer w-full h-4 hubba-900">
            {text}
        </button>
    );
}