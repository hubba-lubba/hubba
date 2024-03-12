import { BaseEntity } from '@/types';

export type Event = {
    date_pasted: Date;
    title: string;
    description: string;
    owner: string;
    moderators: string[];
    users: string[];
} & BaseEntity;
