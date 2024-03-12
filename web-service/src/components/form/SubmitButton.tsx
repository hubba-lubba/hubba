type SubmitButtonProps = {
    text: string;
};

export const SubmitButton = ({ text }: SubmitButtonProps) => {
    return (
        <button type="submit" className="bg-hubba-800 h-9 w-full cursor-pointer rounded-md hover:bg-hubba-500">
            {text}
        </button>
    );
};
