import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { CenterLayout } from '@/components/layout/CenterLayout';

type TextButtonProps = {
    text?: string;
    anchortext?: string;
    path: string;
};

export const TextButton = ({ text, anchortext, path }: TextButtonProps) => {
    return (
        <CenterLayout>
            {text}
            <Link
                to={path}
                className={clsx("cursor-pointer underline hover:text-hubba-500", text ? "ml-1" : "")}
            >
                {anchortext}
            </Link>
        </CenterLayout>
    );
};
