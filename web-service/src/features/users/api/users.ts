import { User, Video } from '../types';
import { getidtoken } from '@/features/auth/api';
import { USER_API_URL } from '@/config';

export const create_user = async (): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };
    const res = await fetch(`${USER_API_URL}/`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({})
    });

    const data = await res.json();
    console.log(`create ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const user = data.user as User;
    return user as User;
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

    const data = await res.json();
    console.log(`get_current_user ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const user = data.user as User;
    return user;
};

export const get_user = async (user_id: string): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${USER_API_URL}?user_id=${user_id}`, {
        method: 'GET',
        headers: headers,
    });

    const data = await res.json();
    console.log(`get ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    const user = data.user as User;
    return user;
};

export const get_live_users = async (): Promise<User[]> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${USER_API_URL}/get_live_users`, {
        method: 'GET',
        headers: headers,
    });

    const data = await res.json();
    console.log(`get live ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    return data.users as User[];
};

export const follow_user = async (user_id: string): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };

    const body = {
        user_id: user_id,
    };

    const res = await fetch(`${USER_API_URL}/follow`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log(`follow ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    return data.user as User;
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

    const data = await res.json();
    console.log(`unfollow ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    return data.user as User;
};

export const update_user = async (user: User): Promise<User> => {
    const { channel, bio, profile_image, streaming_status } = user;

    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };

    const body = {
        channel: channel,
        bio: bio,
        profile_image: profile_image,
        streaming_status: streaming_status,
    };

    console.log(body);

    const res = await fetch(`${USER_API_URL}/`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log(`update ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    return data.user as User;
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

    const data = await res.json();
    console.log(`add video ${JSON.stringify(data)}`);

    if (res.status !== 200) throw res;

    return data.user as User;
};

export const get_videos = async (user: User): Promise<Video[]> => {
    // https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
    const ytidParser = (url: string): string => {
        const regExp =
            /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[7].length == 11 ? match[7] : '';
    };

    const getVideo = async (url: string): Promise<{ video: Video }> => {
        const video_id = ytidParser(url);
        if (!video_id) throw new Error('no video id found in url');

        const data = {
            video: {
                video_id: video_id,
                url: url,
                title: video_id,
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
