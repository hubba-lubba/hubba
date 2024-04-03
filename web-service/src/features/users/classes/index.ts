export class User {
    constructor(
        public username: string,
        public email: string,
        public profile_image: string,
        public bio: string,
        public followers: string[],
        public num_followers: number,
        public following: string[],
        public num_following: number,
        public streaming_status: number,
        public channel_url: string,
        public stream_url: string,
        public video_urls: string[],
        public joined_event_ids: string[],
        public past_event_ids: string[],
        public joined_orgs: string[],
        public platforms: string[],
        public inbox: Message[],
    ) {
        this.username = username;
        this.email = email;
        this.profile_image = profile_image ?? null;
        this.bio = bio ?? 'No bio';
        this.followers = followers ?? [];
        this.num_followers = num_followers ?? 0;
        this.following = following ?? [];
        this.num_following = num_following ?? 0;
        this.streaming_status = streaming_status ?? 0;
        this.channel_url = channel_url ?? null;
        this.stream_url = stream_url ?? null;
        this.video_urls = video_urls ?? [];
        this.joined_event_ids = joined_event_ids ?? [];
        this.past_event_ids = past_event_ids ?? [];
        this.joined_orgs = joined_orgs ?? [];
        this.platforms = platforms ?? [];
        this.inbox = inbox ?? [];
    }
}

export class Message {
    constructor(
        public sender: string,
        public receiver: string,
        public subject: string,
        public content: string,
        public timestamp: Date,
        public read: boolean,
    ) {
        this.sender = sender;
        this.receiver = receiver;
        this.subject = subject;
        this.content = content;
        this.timestamp = timestamp;
        this.read = read;
    }
}