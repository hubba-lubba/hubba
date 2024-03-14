import { BaseEntity } from '@/types';

// extremely rough type schemas. prolly will be very different once we connect with backend

export type Event = {
    title: string;
    thumbnail: string;
    description: string;
    url: string;
    platform: string;
    tags: string[];
    viewer_count: number;
    // date_pasted: Date;
    // title: string;
    // description: string;
    // owner: string;
    // moderators: string[];
    // users: string[];
} & BaseEntity;
