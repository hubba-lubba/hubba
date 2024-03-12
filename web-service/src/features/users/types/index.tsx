import { BaseEntity } from '@/types';

export type User = {
    username: string;
    email: string;
    profile_image: string;

    followers: string[];
    num_followers: number;
    following: string[];
    num_following: number;

    streaming_status: number;
    stream_url: string;
    video_urls: string[];

    joined_event_ids: string[];
    past_event_ids: string[];

    joined_orgs: string[];

    platforms: string[];
} & BaseEntity;
