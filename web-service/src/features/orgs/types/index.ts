import { BaseEntity } from '@/types';

export type Org = {
    name: string;
    description: string;
    owner: string;
    moderators: string[];
    users: string[];
    events: string[];
} & BaseEntity;
