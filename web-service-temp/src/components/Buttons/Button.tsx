import React from 'react';

import styles from './Button.module.scss';

interface Props {
    children: React.ReactNode;
    style?: string;
    handleClick?: () => void;
}

export default function BaseButton({
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
