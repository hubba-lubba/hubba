import React from 'react';
import clsx from 'clsx';
import { IconType } from 'react-icons';

const variants = {
    base: 'flex flex-center items-center cursor-pointer',
    image: 'flex flex-center items-center cursor-pointer w-[calc(100%-25px)] min-w-10 text-start hover:transition-colors ease-in-out hover:text-hubba-500',
    text: 'flex flex-center items-center cursor-pointer border-none bg-none hover:underline',
};
// somehow modularize
// variants inherit from base, but some tac on icon and others tac on underline (2 variants)

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'base' | 'image' | 'text';
    Icon?: IconType;
    image?: string;
    handleClick?: () => void;
    style?: string;
}

export function Button({
    children,
    variant = 'base',
    Icon,
    image,
    handleClick,
    style = '',
}: ButtonProps): React.ReactElement {
    return (
        <button
            onClick={handleClick}
            className={clsx('transition-all', variants[variant], style)}
        >
            {(Icon && <Icon className="h-6 pr-2.5" size={32} />) ||
                (image && (
                    <img src={image} alt="image" className="h-6 pr-2.5" />
                ))}
            {children}
            {/* {text && (
                <p className="cursor-pointer border-none bg-none w-full">
                    {text}
                </p>
            )} */}
        </button>
    );
}
