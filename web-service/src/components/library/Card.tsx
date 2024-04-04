import { useNavigate } from 'react-router-dom';

export type CardProps = {
    children: React.ReactNode;
    url: string;
    internal?: boolean;
};

export const Card = ({ children, url, internal = true }: CardProps) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex w-full cursor-pointer flex-col"
            onClick={() =>
                internal ? navigate(url) : window.open(url, '_blank')
            }
        >
            {children}
        </div>
    );
};
