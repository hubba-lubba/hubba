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
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    console.log(`create ${JSON.stringify(data)}`);
    return data as User;
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

    if (res.status !== 200) throw res;

    const data = await res.json();
    const user = data.user as User;
    return user;
};

// TODO: remove username as a field
// TODO: set specific fields for create and update
export const get_user = async (user_id: string): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(`${USER_API_URL}?user_id=${user_id}`, {
        method: 'GET',
        headers: headers,
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    console.log(`get ${JSON.stringify(data)}`);
    const userData = data.user;
    const user = new User(userData.user_id, userData.username, userData.email);
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

    if (res.status !== 200) throw res;

    const data = await res.json();
    console.log(`get live ${JSON.stringify(data)}`);
    return data.users as User[];
}

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

    if (res.status !== 200) throw res;

    const data = await res.json();
    console.log(`follow ${JSON.stringify(data)}`);
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

    if (res.status !== 200) throw res;

    const data = await res.json();
    console.log(`unfollow ${JSON.stringify(data)}`);
    return data.user as User
};

export const update_user = async (user: User): Promise<User> => {
    const headers = {
        'Content-Type': 'application/json',
        id_token: await getidtoken(),
    };

    const body = {
        ...user,
    };

    const res = await fetch(`${USER_API_URL}/`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    console.log(`update ${JSON.stringify(data)}`);
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

    if (res.status !== 200) throw res;

    const data = await res.json();
    console.log(`add video ${JSON.stringify(data)}`);
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
