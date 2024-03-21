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
    time_of_event: Date;
    status: string;
    host: string;
    entryfee: number;
    prizes: string[];
} & BaseEntity;

/*
export type Event = {
    title: string;
    thumbnail: string;
    description: string;
    url: string;
    platform: string;
    tags: string[];
    viewer_count: number;
    time_of_event: Date;
    host: string;
    entryfee: number;
    prizes: string[];
} & BaseEntity;
*/
