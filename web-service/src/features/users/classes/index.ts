export class User {
    constructor(
        public username: string,
        public email: string,
        public profile_image: string | null = null,
        public bio: string = "No bio.",
        public followers: string[] = [],
        public num_followers: number = 0,
        public following: string[] = [],
        public num_following: number = 0,
        public streaming_status: number = 0,
        public channel_url: string = "",
        public stream_url: string = "",
        public video_urls: string[] = [],
        public joined_event_ids: string[] = [],
        public past_event_ids: string[] = [],
        public joined_orgs: string[] = [],
        public platforms: string[] = [],
        public inbox: Message[] = [],
    ) {
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
        this.stream_url = stream_url;
        this.video_urls = video_urls;
        this.joined_event_ids = joined_event_ids;
        this.past_event_ids = past_event_ids;
        this.joined_orgs = joined_orgs;
        this.platforms = platforms;
        this.inbox = inbox;
    }
}

export class Message {
    constructor(
        public sender: string,
        public receiver: string,
        public subject: string = "No subject.",
        public content: string = "No content.",
        public timestamp: Date = new Date(),
        public read: boolean = false,
    ) {
        this.sender = sender;
        this.receiver = receiver;
        this.subject = subject;
        this.content = content;
        this.timestamp = timestamp;
        this.read = read;
    }
}