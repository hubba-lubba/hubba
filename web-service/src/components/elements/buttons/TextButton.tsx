import { Link } from "react-router-dom";

type TextButtonProps = {
    text: string;
    path: string;
};

export const TextButton = ({ text, path }: TextButtonProps) => {
    return (
        <Link to={path} className="cursor-pointer border-none bg-none underline">
            {text}
        </Link>
    );
};
