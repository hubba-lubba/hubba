import { BaseEntity } from '@/types';

// extremely rough type schemas. prolly will be very different once we connect with backend

export type User = {
    username: string;
    email: string;
    profile_image?: string;
    bio: string;

    followers: string[];
    num_followers: number;
    following: string[];
    num_following: number;

    streaming_status: number;
    channel_url?: string;
    stream_url?: string;
    video_urls: string[];

    joined_event_ids: string[];
    past_event_ids: string[];

    joined_orgs: string[];

    platforms: string[];
    inbox: Message[];
} & BaseEntity;

export type Live = {
    title: string;
    thumbnail: string;
    description: string;
    url: string;
    platform: string;
    tags: string[];
    viewer_count: number;
} & BaseEntity;

export type VideoLink = {
    title: string;
    thumbnail: string;
    description: string;
    url: string;
    platform: string;
    tags: string[];
    viewer_count: number;
} & BaseEntity;

export type Message = {
    sender: string;
    receiver: string;
    subject: string;
    content: string;
    timestamp: Date;
    read: boolean;
} & BaseEntity;
