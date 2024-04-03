// backend: prevent duplicates
import { getidtoken } from '@/features/auth/api';
import { USER_API_URL } from '@/config';

export const changeUsername = async ({
    username,
}: {
    username: string;
}): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };
    const body = {
        username: username,
    };
    const res = await fetch(`${USER_API_URL}/change_username`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`change ${JSON.stringify(data)}`);
}

export const changeBio = async ({
    bio,
}: {
    bio: string;
}): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };
    const body = {
        bio: bio,
    };
    const res = await fetch(`${USER_API_URL}/change_bio`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`change ${JSON.stringify(data)}`);
}

export const changeChannelUrl = async ({
    channelUrl,
}: {
    channelUrl: string;
}): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };
    const body = {
        channel_url: channelUrl,
    };
    const res = await fetch(`${USER_API_URL}/change_channel_url`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`change ${JSON.stringify(data)}`);
}

export const addVideoUrl = async ({
    videoUrl,
}: {
    videoUrl: string;
}): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };
    const body = {
        video_url: videoUrl,
    };
    const res = await fetch(`${USER_API_URL}/add_video_url`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`add ${JSON.stringify(data)}`);
}

export const removeVideoUrl = async ({
    videoUrl,
}: {
    videoUrl: string;
}): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };
    const body = {
        video_url: videoUrl,
    };
    const res = await fetch(`${USER_API_URL}/remove_video_url`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`remove ${JSON.stringify(data)}`);
}

// TODO: figure out platform stuff
export const addPlatform = async ({ platform }: { platform: string }): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };

    const body = {
        platform: platform,
    };

    const res = await fetch(`${USER_API_URL}/add_platform`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`add ${JSON.stringify(data)}`);
}

export const removePlatform = async ({ platform }: { platform: string }): Promise<void> => {
    const idToken = await getidtoken();

    const headers = {
        'Content-Type': 'application/json',
        id_token: idToken,
    };

    const body = {
        platform: platform,
    };

    const res = await fetch(`${USER_API_URL}/remove_platform`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (res.status !== 200) throw res;

    const data = await res.json();
    // verify res
    console.log(`remove ${JSON.stringify(data)}`);
}