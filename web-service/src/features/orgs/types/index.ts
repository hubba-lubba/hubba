export class Org {
    constructor(
        public org_id: string,
        public name: string,
        public image: string,
        public description: string,
        public owner: string,
        public moderators: string[],
        public users: string[],
        public events: string[],
        public created: Date,
    ) {
        this.org_id = org_id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.owner = owner;
        this.moderators = moderators;
        this.users = users;
        this.events = events;
        this.created = created;
    }
}