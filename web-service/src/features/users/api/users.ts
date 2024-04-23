import { User, Video } from '../types';
import { getidtoken } from '@/features/auth/api';
import { USER_API_URL } from '@/config';
import { logger } from '@/utils/logger';

type UserServiceType = {
    username: string;
    user_id: string;
    followers: string[];
    following: string[];
    streaming_status: 0 | 1;
    bio: string; //does not yet have
    profile_picture: string;
    channel: string;
    video_urls: string[];
};

// yuh we extortin
const extort = (userData: UserServiceType): User => {
    return new User(
        userData.user_id,
        userData.username,
        userData.profile_picture,
        userData.bio,
        userData.followers,
        userData.following,
        userData.streaming_status,
        userData.channel,
        userData.video_urls,
    );
};

const extort_many = (usersData: UserServiceType[]): User[] => {
    return usersData.map((orgData) => {
        return extort(orgData);
    });
};

export const create_user = async (): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${USER_API_URL}/`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({}),
    });

    logger(`create`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const userData = data.user as UserServiceType;
        const user = extort(userData);
        return user as User;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const get_current_user = async (): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${USER_API_URL}/get_current_user`, {
        method: 'GET',
        headers: headers,
    });

    logger('get_current_user');

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const userData = data.user as UserServiceType;
        const user = extort(userData);
        return user;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const get_user = async (user_id: string): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${USER_API_URL}?user_id=${user_id}`, {
        method: 'GET',
        headers: headers,
    });

    logger(`get_user`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const userData = data.user as UserServiceType;
        const user = extort(userData);
        return user;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const get_live_users = async (): Promise<User[]> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${USER_API_URL}/get_live_users`, {
        method: 'GET',
        headers: headers,
    });

    logger(`get live`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const usersData = data.users as UserServiceType[];
        const users = extort_many(usersData);
        return users;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const follow_user = async (user_id: string): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };

    const body = {
        following: user_id,
    };

    const res = await fetch(`${USER_API_URL}/add_following`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body),
    });

    logger(`follow`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const userData = data.user as UserServiceType;
        const user = extort(userData);
        return user;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const unfollow_user = async (user_id: string): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };

    const body = {
        user_id: user_id,
    };

    const res = await fetch(`${USER_API_URL}/unfollow`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body),
    });

    logger(`unfollow`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const userData = data.user as UserServiceType;
        const user = extort(userData);
        return user;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const update_user = async ({
    username,
    channel,
    bio,
    profile_image,
    streaming_status,
}: {
    username?: string;
    channel?: string;
    bio?: string;
    profile_image?: string;
    streaming_status?: 0 | 1;
}): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };

    // undefined fields aren't included in stringified object
    const body = {
        username: username,
        channel: channel,
        bio: bio,
        profile_picture: profile_image,
        streaming_status: streaming_status,
    };

    const res = await fetch(`${USER_API_URL}/`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body),
    });

    logger(`update ${JSON.stringify(body)}`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const userData = data.user as UserServiceType;
        const user = extort(userData);
        return user;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

export const add_video = async (video_url: string): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };

    const res = await fetch(`${USER_API_URL}/add_video`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ video_url }),
    });

    logger(`add video`);

    try {
        const data = await res.json();
        logger(JSON.stringify(data));

        if (res.status !== 200) throw res;

        const userData = data.user as UserServiceType;
        const user = extort(userData);
        return user;
    } catch (e) {
        logger(`${e}`);
        throw e;
    }
};

type Noembed = {
    width: number;
    author_name: string;
    author_url: string;
    version: string;
    provider_url: string;
    provider_name: string;
    thumbnail_width: number;
    thumbnail_url: string;
    height: number;
    thumbnail_height: number;
    html: string;
    url: string;
    type: string;
    title: string;
};

export const get_videos = async (user: User): Promise<Video[]> => {
    // https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
    const ytidParser = (url: string): string => {
        const regExp =
            /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[7].length == 11 ? match[7] : '';
    };

    const getNoembedData = async (url: string): Promise<Noembed> => {
        const noembedUrl = `https://noembed.com/embed?dataType=json&url=${url}`;
        const res = await fetch(noembedUrl);
        const data = await res.json();
        return data;
    };
    const getVideo = async (url: string): Promise<{ video: Video }> => {
        const video_id = ytidParser(url);
        if (!video_id) throw new Error('no video id found in url');

        const noembedData = await getNoembedData(url);

        const data = {
            video: {
                video_id: video_id,
                url: url,
                title: noembedData.title,
                author: noembedData.author_name,
                thumbnail: `https://img.youtube.com/vi/${video_id}/maxresdefault.jpg`,
            } as Video,
        };
        return data;
    };

    const data = await Promise.all(
        user.video_urls.map(async (url) => (await getVideo(url)).video),
    );
    return data;
};
