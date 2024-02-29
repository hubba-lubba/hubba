import React from 'react';
import { BaseButton } from '@/components/elements/buttons';

import styles from './button.module.scss';
interface Props {
    icon: string;
    name: string;
}

export function MenuButton({ icon, name }: Props): React.ReactElement {
    return (
        <BaseButton style={styles.menuButton}>
            <img src={icon} className={styles.icon} alt="Menu icon" />
            <p className={styles.name}>{name}</p>
        </BaseButton>
    );
}
