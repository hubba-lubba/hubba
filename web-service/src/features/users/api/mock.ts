import { Message, User } from '../types';
import { getidtoken } from '@/features/auth/api';
import { USER_API_URL } from '@/config';


// BELOW ARE MOCK FUNCTIONS

export const getUser = async (id: string): Promise<{ user: User }> => {
    const data = {
        user: {
            id: id,
            username: `user with id ${id}`,
            email: 'email1',
            profile_image: undefined,
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
            joined_orgs: ['org1', 'org2', 'org3', 'org4', 'org5', 'org6'],
            platforms: ['platform1', 'platform2'],
            inbox: (await getInbox()).messages,
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
                sender: 'sen1',
                receiver: 'rec1',
                subject:
                    'This is a long subject line for many reasons idk idk idk idk idk idk idk idk lorem ipsum fuckery boohoo poopoo',
                content:
                    "Hi x, we'd like to invite you to our organization. Our organization is The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly but gets faster each minute after you hear this signal bodeboop. A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark. Get ready!… Start. ding. Please click this button to join.",
                timestamp: new Date('2021-09-22'),
                read: false,
            },
            {
                id: '2',
                sender: 'sen2',
                receiver: 'rec2',
                subject: 'Fitness gram',
                content:
                    'The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly but gets faster each minute after you hear this signal bodeboop. A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark. Get ready!… Start. ding',
                timestamp: new Date('2021-09-08'),
                read: false,
            },
            {
                id: '3',
                sender: 'aaa',
                receiver: 'receiver1',
                subject: 'This is a subject line',
                content: 'content3',
                timestamp: new Date('2021-09-04'),
                read: true,
            },
            {
                id: '4',
                sender: 'sender1',
                receiver: 'receiver1',
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

export const getFollowingChannels = async (user: User): Promise<User[]> => {
    const data = await Promise.all(
        user.following.map(async (id) => (await getUser(id)).user),
    );
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

export const getVideoLinks = async () => {
    const data = {
        videos: [
            {
                id: 'vid1',
                title: 'title1',
                name: 'vid1',
                thumbnail: 'https://placehold.co/600x400',
                description: 'vid desc',
                url: 'https://www.youtube.com/watch?v=f8p7RR-IPGY',
                platform: 'YouTube',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
            },
            {
                id: 'vid2',
                title: 'title2',
                name: 'vid2',
                thumbnail: 'https://placehold.co/600x400',
                description: 'vid desc',
                url: 'https://www.youtube.com/watch?v=ZdhLGlIDNPs',
                platform: 'YouTube',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
            },
            {
                id: 'vid3',
                title: 'title3',
                name: 'vid3',
                thumbnail: 'https://placehold.co/600x400',
                description: 'vid desc',
                url: 'https://www.youtube.com/watch?v=Bkstj0BtjXE',
                platform: 'YouTube',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
            },
            {
                id: 'vid4',
                title: 'title4',
                name: 'vid4',
                thumbnail: 'https://placehold.co/600x400',
                description: 'vid desc',
                url: 'https://www.youtube.com/watch?v=Bkstj0BtjXE',
                platform: 'YouTube',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
            },
            {
                id: 'vid5',
                title: 'title4',
                name: 'vid4',
                thumbnail: 'https://placehold.co/600x400',
                description: 'vid desc',
                url: 'https://www.youtube.com/watch?v=Bkstj0BtjXE',
                platform: 'YouTube',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
            },
            {
                id: 'vid6',
                title: 'title4',
                name: 'vid4',
                thumbnail: 'https://placehold.co/600x400',
                description: 'vid desc',
                url: 'https://www.youtube.com/watch?v=Bkstj0BtjXE',
                platform: 'YouTube',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
            },
        ],
    };
    return data;
};
