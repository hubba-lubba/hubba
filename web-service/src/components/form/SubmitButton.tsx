type SubmitButtonProps = {
    text: string;
};

export const SubmitButton = ({ text }: SubmitButtonProps) => {
    return (
        <button type="submit" className="hubba-900 h-4 w-full cursor-pointer">
            {text}
        </button>
    );
};
