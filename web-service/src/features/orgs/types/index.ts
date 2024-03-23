import { BaseEntity } from '@/types';
import { User } from '@/features/users/types';

export type Org = {
    name: string;
    image: string;
    description: string;
    owner: string;
    moderators: string[];
    users: User[];
    events: string[];
} & BaseEntity;
