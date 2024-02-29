import React from 'react';
import { BaseButton } from '@/components/elements/buttons';

import styles from './button.module.scss';

interface Props {
    name: string;
}

export function OrgButton({ name }: Props): React.ReactElement {
    return (
        <BaseButton style={styles.orgButton}>
            <p>{name}</p>
        </BaseButton>
    );
}
