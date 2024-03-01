import React from 'react';

const variant = {
    base: 'flex flex-center cursor-pointer ',
    channel: 'flex';
};
// somehow modularize
// variants inherit from base, but some tac on icon and others tac on underline (2 variants)


interface Props {
    children: React.ReactNode;
    style?: string;
    handleClick?: () => void;
}

export function BaseButton({
    children,
    style = '',
    handleClick,
}: Props): React.ReactElement {
    return (
        <button
            onClick={handleClick}
            className={`${styles.baseButton} ${style}`}
        >
            {children}
        </button>
    );
}
