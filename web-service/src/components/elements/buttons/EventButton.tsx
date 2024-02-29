import React from 'react';
import { BaseButton } from '@/components/elements/buttons';

import styles from './button.module.scss';
interface Props {
    name: string;
}

export function EventButton({ name }: Props): React.ReactElement {
    return (
        <BaseButton style={styles.eventButton}>
            <p>{name}</p>
        </BaseButton>
    );
}
