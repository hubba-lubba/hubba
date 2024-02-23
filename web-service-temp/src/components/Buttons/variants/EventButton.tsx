import React from 'react';
import BaseButton from '../Button';

import styles from '../styles/EventButton.module.scss';

interface Props {
    name: string;
}

export default function EventButton({ name }: Props): React.ReactElement {
    return (
        <BaseButton style={styles.eventButton}>
            <p>{name}</p>
        </BaseButton>
    );
}
