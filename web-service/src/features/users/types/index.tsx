import { BaseEntity } from '@/types';

// TODO: once backend is updated to contain all necessary fields, remove optionality
export type UserType = {
    username: string;
    email: string;
    profile_image?: string;
    bio?: string;

    followers: string[];
    num_followers: number;
    following: string[];
    num_following: number;

    streaming_status?: number;
    channel_url?: string;
    stream_url?: string;
    video_urls?: string[];

    joined_event_ids?: string[];
    past_event_ids?: string[];

    joined_orgs?: string[];

    platforms?: string[];
    inbox?: Message[];
} & BaseEntity;

export type MessageType = {
    sender: string;
    receiver: string;
    subject?: string;
    content?: string;
    timestamp?: Date;
    read?: boolean;
} & BaseEntity;

export class User {
    constructor(userData: UserType) {
        Object.assign(this, {
            profile_image: null,
            bio: 'No bio.',
            streaming_status: 0,
            channel_url: '',
            stream_url: '',
            video_urls: [],
            joined_event_ids: [],
            past_event_ids: [],
            joined_orgs: [],
            platforms: [],
            inbox: [],
            ...userData,
        });
    }
}

export class Message {
    constructor(messageData: MessageType) {
        Object.assign(this, {
            subject: 'No subject.',
            content: 'No content.',
            timestamp: new Date(),
            read: false,
            ...messageData,
        });
    }
}

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
