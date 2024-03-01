import React from 'react';
import { BaseButton } from '@/components/elements/buttons';


interface Props {
    icon: string;
    name: string;
}

export function ChannelButton({
    icon,
    name,
}: Props): React.ReactElement {
    return (
        <BaseButton channelButton>
            <img src={icon} className={styles.icon} alt="Channel icon" />
            <p className={styles.name}>{name}</p>
        </BaseButton>
    );
}
