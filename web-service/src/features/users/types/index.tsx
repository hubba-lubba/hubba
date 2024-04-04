export class User {
    constructor(
        public user_id: string,
        public username: string,
        public email: string,
        public profile_image: string | undefined = undefined,
        public bio: string = "No bio.",
        public followers: string[] = [],
        public num_followers: number = 0,
        public following: string[] = [],
        public num_following: number = 0,
        public streaming_status: number = 0,
        public channel_url: string = "",
        public video_urls: string[] = [],
        public joined_events: string[] = [],
        public past_events: string[] = [],
        public joined_orgs: string[] = [],
        public platforms: string[] = [],
        public inbox: Message[] = [],
    ) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.profile_image = profile_image;
        this.bio = bio;
        this.followers = followers;
        this.num_followers = num_followers;
        this.following = following;
        this.num_following = num_following;
        this.streaming_status = streaming_status;
        this.channel_url = channel_url;
        this.video_urls = video_urls;
        this.joined_events = joined_events;
        this.past_events = past_events;
        this.joined_orgs = joined_orgs;
        this.platforms = platforms;
        this.inbox = inbox;
    }
}

export class Message {
    constructor(
        public message_id: string,
        public sender: string,
        public receiver: string,
        public subject: string = "No Subject.",
        public content: string = "No Content.",
        public timestamp: Date = new Date(),
        public read: boolean = false,
    ) {
        this.message_id = message_id;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.timestamp = timestamp;
    }
}

// TODO: figure out what to do with these when you implement twitch api
export type Live = {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    url: string;
    platform: string;
    tags: string[];
    viewer_count: number;
};

export type VideoLink = {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    url: string;
    platform: string;
    tags: string[];
    viewer_count: number;
};
