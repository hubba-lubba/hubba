import { User, Video, Message } from '../types';

// BELOW ARE MOCK FUNCTIONS
export const getMockUser = async (id: string): Promise<{ user: User }> => {
    const data = {
        user: {
            user_id: id,
            username: `user with id ${id}`,
            email: 'email1',
            profile_image: undefined,
            bio: 'bio1',
            followers: ['follower1', 'follower2'],
            num_followers: 2,
            following: ['following1', 'following2'],
            num_following: 2,
            streaming_status: 0,
            channel: 'caseoh_',
            video_urls: [
                'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            ],
            joined_events: ['event1', 'event2'],
            past_events: ['event3', 'event4'],
            joined_orgs: ['org1', 'org2', 'org3', 'org4', 'org5', 'org6'],
            owned_orgs: [],
            platforms: ['platform1', 'platform2'],
        } as User,
    };
    return data;
};

export const getFollowingChannels = async (user: User): Promise<User[]> => {
    const data = await Promise.all(
        user.following.map(async (id) => (await getMockUser(id)).user),
    );
    return data;
};

export const getLiveUsers = async (): Promise<{ users: User[] }> => {
    const data = {
        users: [
            {
                user_id: '1',
                username: 'user with id 1',
                email: 'email1',
                profile_image: undefined,
                bio: 'bio1',
                followers: ['follower1', 'follower2'],
                num_followers: 2,
                following: ['following1', 'following2'],
                num_following: 2,
                streaming_status: 1,
                channel: 'caseoh_',
                video_urls: ['video_url1', 'video_url2'],
                joined_events: ['event1', 'event2'],
                past_events: ['event3', 'event4'],
                joined_orgs: ['org1', 'org2', 'org3', 'org4', 'org5', 'org6'],
                owned_orgs: [],
                platforms: ['platform1', 'platform2'],
            } as User,
            {
                user_id: '2',
                username: 'user with id 2',
                email: 'email1',
                profile_image: undefined,
                bio: 'bio1',
                followers: ['follower1', 'follower2'],
                num_followers: 2,
                following: ['following1', 'following2'],
                num_following: 2,
                streaming_status: 1,
                channel: 'faide',
                video_urls: ['video_url1', 'video_url2'],
                joined_events: ['event1', 'event2'],
                past_events: ['event3', 'event4'],
                joined_orgs: ['org1', 'org2', 'org3', 'org4', 'org5', 'org6'],
                owned_orgs: [],
                platforms: ['platform1', 'platform2'],
            } as User,
            {
                user_id: '3',
                username: 'user with id 3',
                email: 'email1',
                profile_image: undefined,
                bio: 'bio1',
                followers: ['follower1', 'follower2'],
                num_followers: 2,
                following: ['following1', 'following2'],
                num_following: 2,
                streaming_status: 1,
                channel: 'xQc',
                video_urls: ['video_url1', 'video_url2'],
                joined_events: ['event1', 'event2'],
                past_events: ['event3', 'event4'],
                joined_orgs: ['org1', 'org2', 'org3', 'org4', 'org5', 'org6'],
                owned_orgs: [],
                platforms: ['platform1', 'platform2'],
            } as User,
        ],
    };
    return data;
};

export const getVideo = async (url: string): Promise<{ video: Video }> => {
    const data = {
        video: {
            video_id: 'dQw4w9WgXcQ',
            url: url,
            title: 'Click This Video',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg',
        } as Video,
    };
    return data;
};

export const getVideos = async (user: User): Promise<Video[]> => {
    const data = await Promise.all(
        user.video_urls.map(async (url) => (await getVideo(url)).video),
    );
    return data;
};

// for invitations or requests, create a button componoent that extends button
// specifically for this: contains link with info and token.
// content will simply hold a react component with said values.
export const getMockInbox = async (): Promise<{ messages: Message[] }> => {
    const data = {
        // order by time
        messages: [
            {
                message_id: '1',
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
                message_id: '2',
                sender: 'sen2',
                receiver: 'rec2',
                subject: 'Fitness gram',
                content:
                    'The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly but gets faster each minute after you hear this signal bodeboop. A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark. Get ready!… Start. ding',
                timestamp: new Date('2021-09-08'),
                read: false,
            },
            {
                message_id: '3',
                sender: 'aaa',
                receiver: 'receiver1',
                subject: 'This is a subject line',
                content: 'content3',
                timestamp: new Date('2021-09-04'),
                read: true,
            },
            {
                message_id: '4',
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
