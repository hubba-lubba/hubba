import React from 'react';
import clsx from 'clsx';

const variants = {
    base: 'flex flex-center cursor-pointer',
    menu: 'flex flex-center cursor-pointer w-[calc(100%-25px)] min-w-10 text-start hover:transition-colors ease-in-out hover:text-hubba-500',
    icon: 'flex flex-center cursor-pointer w-[calc(100%-25px)] min-w-10 text-start hover:transition-colors ease-in-out hover:text-hubba-500',
    text: 'flex flex-center cursor-pointer border-none bg-none hover:underline',
};
// somehow modularize
// variants inherit from base, but some tac on icon and others tac on underline (2 variants)

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'base' | 'menu' | 'icon' | 'text';
    icon?: string;
    alt?: string;
    handleClick?: () => void;
    style?: string;
}

export function Button({
    children,
    variant = 'base',
    icon,
    alt,
    handleClick,
    style = '',
}: ButtonProps): React.ReactElement {
    return (
        <button
            onClick={handleClick}
            className={clsx('transition-all', variants[variant], style)}
        >
            {icon && (
                <img
                    src={icon}
                    className={clsx(
                        'h-6 pr-2.5',
                        variant == 'menu' ? 'invert' : '',
                    )}
                    alt={alt}
                />
            )}
            {children}
            {/* {text && (
                <p className="cursor-pointer border-none bg-none w-full">
                    {text}
                </p>
            )} */}
        </button>
    );
}
