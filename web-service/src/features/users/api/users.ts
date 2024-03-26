// export type User = {
//     username: string;
//     email: string;
//     profile_image: string;
//     bio: string;

//     followers: string[];
//     num_followers: number;
//     following: string[];
//     num_following: number;

//     streaming_status: number;
//     stream_url: string;
//     video_urls: string[];

//     joined_event_ids: string[];
//     past_event_ids: string[];

//     joined_orgs: string[];

//     platforms: string[];
// } & BaseEntity;

import defaultimg from '@/assets/images/defaultimg.png';
import { Message, User } from '../types';

// Q: do you type the return value of these functions in TS?
export const getFollowingChannels = async (): Promise<{
    following: User[];
}> => {
    const data = {
        following: [
            {
                id: 'user_1',
                username: 'user1',
                email: 'email1',
                profile_image: defaultimg,
                bio: 'bio1',
                followers: ['follower1', 'follower2'],
                num_followers: 2,
                following: ['following1', 'following2'],
                num_following: 2,
                streaming_status: 1,
                channel_url: 'https://www.google.com',
                stream_url: 'stream_url1',
                video_urls: ['video_url1', 'video_url2'],
                joined_event_ids: ['event1', 'event2'],
                past_event_ids: ['event3', 'event4'],
                joined_orgs: ['org1', 'org2'],
                platforms: ['platform1', 'platform2'],
            },
            {
                id: 'user_2',
                username: 'user2',
                email: 'email2',
                profile_image: defaultimg,
                bio: 'bio2',
                followers: ['follower1', 'follower2'],
                num_followers: 2,
                following: ['following1', 'following2'],
                num_following: 2,
                streaming_status: 1,
                channel_url: 'https://www.google.com',
                stream_url: 'stream_url2',
                video_urls: ['video_url1', 'video_url2'],
                joined_event_ids: ['event1', 'event2'],
                past_event_ids: ['event3', 'event4'],
                joined_orgs: ['org1', 'org2'],
                platforms: ['platform1', 'platform2'],
            },
            {
                id: 'user_3',
                username: 'user3',
                email: 'email3',
                profile_image: defaultimg,
                bio: 'bio3',
                followers: ['follower1', 'follower2'],
                num_followers: 2,
                following: ['following1', 'following2'],
                num_following: 2,
                streaming_status: 1,
                channel_url: 'https://www.google.com',
                stream_url: 'stream_url3',
                video_urls: ['video_url1', 'video_url2'],
                joined_event_ids: ['event1', 'event2'],
                past_event_ids: ['event3', 'event4'],
                joined_orgs: ['org1', 'org2'],
                platforms: ['platform1', 'platform2'],
            },
        ],
    };
    return data;
};

export const getLiveUsers = async () => {
    const data = {
        live: [
            {
                id: '7',
                title: 'Live 1',
                thumbnail: 'https://placehold.co/300x200',
                description: 'This is a description',
                url: 'https://www.https://www.google.com',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
            },
            {
                id: '8',
                title: 'Event 8',
                thumbnail: 'https://placehold.co/300x200',
                description: 'This is a description',
                url: 'https://www.https://www.google.com',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
            },
            {
                id: '9',
                title: 'Event 9',
                thumbnail: 'https://placehold.co/300x200',
                description: 'This is a description',
                url: 'https://www.https://www.google.com',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
            },
            {
                id: '9',
                title: 'Event 9',
                thumbnail: 'https://placehold.co/300x200',
                description: 'This is a description',
                url: 'https://www.https://www.google.com',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
            },
            {
                id: '9',
                title: 'Event 9',
                thumbnail: 'https://placehold.co/300x200',
                description: 'This is a description',
                url: 'https://www.https://www.google.com',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
            },
        ],
    };
    return data;
};

export const getUser = async (id: string): Promise<{ user: User }> => {
    const data = {
        user: {
            id: id,
            username: `bob ${id}`,
            email: 'email1',
            profile_image: defaultimg,
            bio: 'bio1',
            followers: ['follower1', 'follower2'],
            num_followers: 2,
            following: ['following1', 'following2'],
            num_following: 2,
            streaming_status: 1,
            channel_url: 'https://www.google.com',
            stream_url: 'stream_url1',
            video_urls: ['video_url1', 'video_url2'],
            joined_event_ids: ['event1', 'event2'],
            past_event_ids: ['event3', 'event4'],
            joined_orgs: ['org1', 'org2'],
            platforms: ['platform1', 'platform2'],
        },
    };
    return data;
};

// for invitations or requests, create a button componoent that extends button
// specifically for this: contains link with info and token.
// content will simply hold a react component with said values.
export const getInbox = async (): Promise<{ messages: Message[] }> => {
    const data = {
        // order by time
        messages: [
            {
                id: '1',
                sender: {
                    id: 'sender1',
                    username: 'sender1',
                    email: 'email1',
                    profile_image: defaultimg,
                    bio: 'bio1',
                    followers: ['follower1', 'follower2'],
                    num_followers: 2,
                    following: ['following1', 'following2'],
                    num_following: 2,
                    streaming_status: 1,
                    channel_url: 'https://www.google.com',
                    stream_url: 'stream_url1',
                    video_urls: ['video_url1', 'video_url2'],
                    joined_event_ids: ['event1', 'event2'],
                    past_event_ids: ['event3', 'event4'],
                    joined_orgs: ['org1', 'org2'],
                    platforms: ['platform1', 'platform2'],
                },
                receiver: {
                    id: 'receiver1',
                    username: 'receiver1',
                    email: 'email1',
                    profile_image: defaultimg,
                    bio: 'bio1',
                    followers: ['follower1', 'follower2'],
                    num_followers: 2,
                    following: ['following1', 'following2'],
                    num_following: 2,
                    streaming_status: 1,
                    channel_url: 'https://www.google.com',
                    stream_url: 'stream_url1',
                    video_urls: ['video_url1', 'video_url2'],
                    joined_event_ids: ['event1', 'event2'],
                    past_event_ids: ['event3', 'event4'],
                    joined_orgs: ['org1', 'org2'],
                    platforms: ['platform1', 'platform2'],
                },
                subject:
                    'This is a long subject line for many reasons idk idk idk idk idk idk idk idk lorem ipsum fuckery boohoo poopoo',
                content:
                    "Hi x, we'd like to invite you to our organization. Our organization is The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly but gets faster each minute after you hear this signal bodeboop. A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark. Get ready!… Start. ding. Please click this button to join.",
                timestamp: new Date('2021-09-22'),
                read: false,
            },
            {
                id: '2',
                sender: {
                    id: 'sender2',
                    username: 'sender2',
                    email: 'email1',
                    profile_image: defaultimg,
                    bio: 'bio1',
                    followers: ['follower1', 'follower2'],
                    num_followers: 2,
                    following: ['following1', 'following2'],
                    num_following: 2,
                    streaming_status: 1,
                    channel_url: 'https://www.google.com',
                    stream_url: 'stream_url1',
                    video_urls: ['video_url1', 'video_url2'],
                    joined_event_ids: ['event1', 'event2'],
                    past_event_ids: ['event3', 'event4'],
                    joined_orgs: ['org1', 'org2'],
                    platforms: ['platform1', 'platform2'],
                },
                receiver: {
                    id: 'receiver1',
                    username: 'receiver1',
                    email: 'email1',
                    profile_image: defaultimg,
                    bio: 'bio1',
                    followers: ['follower1', 'follower2'],
                    num_followers: 2,
                    following: ['following1', 'following2'],
                    num_following: 2,
                    streaming_status: 1,
                    channel_url: 'https://www.google.com',
                    stream_url: 'stream_url1',
                    video_urls: ['video_url1', 'video_url2'],
                    joined_event_ids: ['event1', 'event2'],
                    past_event_ids: ['event3', 'event4'],
                    joined_orgs: ['org1', 'org2'],
                    platforms: ['platform1', 'platform2'],
                },
                subject: 'Fitness gram',
                content:
                    'The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly but gets faster each minute after you hear this signal bodeboop. A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark. Get ready!… Start. ding',
                timestamp: new Date('2021-09-08'),
                read: false,
            },
            {
                id: '3',
                sender: {
                    id: 'sender3',
                    username: 'sender3',
                    email: 'email1',
                    profile_image: defaultimg,
                    bio: 'bio1',
                    followers: ['follower1', 'follower2'],
                    num_followers: 2,
                    following: ['following1', 'following2'],
                    num_following: 2,
                    streaming_status: 1,
                    channel_url: 'https://www.google.com',
                    stream_url: 'stream_url1',
                    video_urls: ['video_url1', 'video_url2'],
                    joined_event_ids: ['event1', 'event2'],
                    past_event_ids: ['event3', 'event4'],
                    joined_orgs: ['org1', 'org2'],
                    platforms: ['platform1', 'platform2'],
                },
                receiver: {
                    id: 'receiver1',
                    username: 'receiver1',
                    email: 'email1',
                    profile_image: defaultimg,
                    bio: 'bio1',
                    followers: ['follower1', 'follower2'],
                    num_followers: 2,
                    following: ['following1', 'following2'],
                    num_following: 2,
                    streaming_status: 1,
                    channel_url: 'https://www.google.com',
                    stream_url: 'stream_url1',
                    video_urls: ['video_url1', 'video_url2'],
                    joined_event_ids: ['event1', 'event2'],
                    past_event_ids: ['event3', 'event4'],
                    joined_orgs: ['org1', 'org2'],
                    platforms: ['platform1', 'platform2'],
                },
                subject: 'This is a subject line',
                content: 'content3',
                timestamp: new Date('2021-09-04'),
                read: true,
            },
            {
                id: '4',
                sender: {
                    id: 'sender4',
                    username: 'sender4',
                    email: 'email1',
                    profile_image: defaultimg,
                    bio: 'bio1',
                    followers: ['follower1', 'follower2'],
                    num_followers: 2,
                    following: ['following1', 'following2'],
                    num_following: 2,
                    streaming_status: 1,
                    channel_url: 'https://www.google.com',
                    stream_url: 'stream_url1',
                    video_urls: ['video_url1', 'video_url2'],
                    joined_event_ids: ['event1', 'event2'],
                    past_event_ids: ['event3', 'event4'],
                    joined_orgs: ['org1', 'org2'],
                    platforms: ['platform1', 'platform2'],
                },
                receiver: {
                    id: 'receiver1',
                    username: 'receiver1',
                    email: 'email1',
                    profile_image: defaultimg,
                    bio: 'bio1',
                    followers: ['follower1', 'follower2'],
                    num_followers: 2,
                    following: ['following1', 'following2'],
                    num_following: 2,
                    streaming_status: 1,
                    channel_url: 'https://www.google.com',
                    stream_url: 'stream_url1',
                    video_urls: ['video_url1', 'video_url2'],
                    joined_event_ids: ['event1', 'event2'],
                    past_event_ids: ['event3', 'event4'],
                    joined_orgs: ['org1', 'org2'],
                    platforms: ['platform1', 'platform2'],
                },
                subject: 'subject1',
                content:
                    'The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly but gets faster each minute after you hear this signal bodeboop. A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark. Get ready!… Start. ding',
                timestamp: new Date('2021-09-01'),
                read: true,
            },
        ],
    };

    return data;
};
