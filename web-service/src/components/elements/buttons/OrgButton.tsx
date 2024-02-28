import React from 'react';
import BaseButton from '../Button';

import styles from '../styles/OrgButton.module.scss';

interface Props {
    name: string;
}

export default function OrgButton({ name }: Props): React.ReactElement {
    return (
        <BaseButton style={styles.orgButton}>
            <p>{name}</p>
        </BaseButton>
    );
}
