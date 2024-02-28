import React from 'react';

import BaseButton from '../Button';
import styles from '../styles/MenuButton.module.scss';

interface Props {
    icon: string;
    name: string;
}

export default function MenuButton({ icon, name }: Props): React.ReactElement {
    return (
        <BaseButton style={styles.menuButton}>
            <img src={icon} className={styles.icon} alt="Menu icon" />
            <p className={styles.name}>{name}</p>
        </BaseButton>
    );
}
