export class Event {
    constructor(
        public event_id: string,
        public host_org: string,
        public name: string,
        public thumbnail: string,
        public description: string,
        // public channel: string,
        // public url: string,
        // public platform: string,
        // public tags: string[],
        public time_of: Date,
        public status: 0 | 1,
        public prizes: string[],
        public attendees: string[],
    ) {
        this.event_id = event_id;
        this.host_org = host_org;
        this.name = name;
        this.thumbnail = thumbnail;
        this.description = description;
        // this.channel = channel;
        // this.url = url;
        // this.platform = platform;
        // this.tags = tags;
        this.time_of = time_of;
        this.status = status;
        this.prizes = prizes;
        this.attendees = attendees;
    }
}
