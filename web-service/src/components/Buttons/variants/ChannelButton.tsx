import React from 'react';

import BaseButton from '../Button';
import styles from '../styles/ChannelButton.module.scss';

interface Props {
    icon: string;
    name: string;
}

export default function ChannelButton({
    icon,
    name,
}: Props): React.ReactElement {
    return (
        <BaseButton style={styles.channelButton}>
            <img src={icon} className={styles.icon} alt="Channel icon" />
            <p className={styles.name}>{name}</p>
        </BaseButton>
    );
}
