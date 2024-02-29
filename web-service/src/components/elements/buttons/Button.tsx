import React from 'react';

import styles from './button.module.scss';

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
