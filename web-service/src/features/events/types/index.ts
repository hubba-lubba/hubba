import { BaseEntity } from '@/types';

// extremely rough type schemas. prolly will be very different once we connect with backend

export type Event = {
    title: string;
    thumbnail: string;
    description: string;
    url: string;
    tags: string[];
    time_of_event: Date;
    status: string;
    host: string;
    prizes: string[];
} & BaseEntity;
