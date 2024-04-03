export class Event {
    constructor(
        public event_id: string,
        public title: string,
        public thumbnail: string,
        public description: string,
        public url: string,
        public platform: string,
        public tags: string[],
        public viewer_count: number,
        public time_of_event: Date,
        public status: string,
        public host: string,
        public prizes: string[],
    ) {
        this.event_id = event_id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.description = description;
        this.url = url;
        this.platform = platform;
        this.tags = tags;
        this.viewer_count = viewer_count;
        this.time_of_event = time_of_event;
        this.status = status;
        this.host = host;
        this.prizes = prizes;
    }
}