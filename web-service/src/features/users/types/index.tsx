export class User {
    constructor(
        public user_id: string,
        public username: string,
        public email: string,
        public profile_image: string | undefined = undefined,
        public bio: string = 'No bio.',
        public followers: string[] = [],
        public num_followers: number = 0,
        public following: string[] = [],
        public num_following: number = 0,
        public streaming_status: 0 | 1 = 0,
        public channel: string = '',
        public video_urls: string[] = [],
        public joined_events: string[] = [],
        public past_events: string[] = [],
        public joined_orgs: string[] = [],
        public platforms: string[] = [],
        // public inbox: Message[] = [],
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
        this.channel = channel; //may not need if connect platforms
        this.video_urls = video_urls;
        this.joined_events = joined_events;
        this.past_events = past_events;
        this.joined_orgs = joined_orgs;
        this.platforms = platforms;
        // this.inbox = inbox;
    }
}

// export class Message {
//     constructor(
//         public message_id: string,
//         public sender: string,
//         public receiver: string,
//         public subject: string = 'No Subject.',
//         public content: string = 'No Content.',
//         public timestamp: Date = new Date(),
//         public read: boolean = false,
//     ) {
//         this.message_id = message_id;
//         this.sender = sender;
//         this.receiver = receiver;
//         this.content = content;
//         this.timestamp = timestamp;
//     }
// }

// do not implement on backend
// only for YT rn, Twitch requires use of Twitch API which we dont wanna implement.
// https://stackoverflow.com/questions/46722459/how-to-get-twitch-video-thumbnail-url
export class Video {
    constructor(
        public video_id: string,
        public url: string,
        public title: string,
        public thumbnail: string,
    ) {
        this.video_id = video_id;
        this.url = url;
        this.title = title;
        this.thumbnail = thumbnail;
    }
}