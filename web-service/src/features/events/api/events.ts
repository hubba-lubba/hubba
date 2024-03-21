export const getCurrentEvents = async () => {
    const data = {
        events: [
            {
                id: '1',
                title: 'Event 1',
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                url: 'https://youtu.be/Z0egSBVYiAQ?si=K4tEPlxozek-Pcnt',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
                time_of_event: 'Wed, 27 July 2016 07:45:00 UTC',
                host: 'hostname',
                entryfee: 0,
                prizes: ['prize1', 'prize2', 'prize3'],
            },
            {
                id: '2',
                title: 'Event 2',
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
                time_of_event: 'Wed, 27 July 2016 07:45:00 UTC',
                host: 'hostname',
                entryfee: 0,
                prizes: ['prize1', 'prize2', 'prize3'],
            },
            {
                id: '3',
                title: 'Event 3',
                thumbnail: 'https://placehold.co/600x400',
                description: 'This is a description',
                url: 'https://youtu.be/m195iKnUJJ0?si=aCESTtlxrDJS6TzM',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
                time_of_event: 'Wed, 27 July 2016 07:45:00 UTC',
                host: 'hostname',
                entryfee: 0,
                prizes: ['prize1', 'prize2', 'prize3'],
            },
        ],
    };
    return data;
};

export const getUpcomingEvents = async () => {
    const data = {
        events: [
            {
                id: '4',
                title: 'Event 4',
                thumbnail: 'https://placehold.co/300x200',
                description: 'This is a description',
                url: 'https://youtu.be/QIpFpgzC9Z0?si=R4WSGNBQMkB4H8Mo',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
                time_of_event: 'Wed, 27 July 2016 07:45:00 UTC',
                host: 'hostname',
                entryfee: 0,
                prizes: ['prize1', 'prize2', 'prize3'],
            },
            {
                id: '5',
                title: 'Event 5',
                thumbnail: 'https://placehold.co/300x200',
                description: 'This is a description',
                url: 'https://youtu.be/P4BHWDZUpXM?si=958zKUFV2R5OzHZF',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
                time_of_event: 'Wed, 27 July 2016 07:45:00 UTC',
                host: 'hostname',
                entryfee: 0,
                prizes: ['prize1', 'prize2', 'prize3'],
            },
            {
                id: '12',
                title: 'Event 24',
                thumbnail: 'https://placehold.co/300x200',
                description: 'This is a description',
                url: 'https://youtu.be/EPROOSJYOSw?si=8g3haNMuiNR_-Vck',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
                time_of_event: 'Wed, 27 July 2016 07:45:00 UTC',
                host: 'hostname',
                entryfee: 0,
                prizes: ['prize1', 'prize2', 'prize3'],
            },
            {
                id: '10',
                title: 'Event 22',
                thumbnail: 'https://placehold.co/300x200',
                description: 'This is a description',
                url: 'https://www.google.com',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
                time_of_event: 'Wed, 27 July 2016 07:45:00 UTC',
                host: 'hostname',
                entryfee: 0,
                prizes: ['prize1', 'prize2', 'prize3'],
            },
            {
                id: '11',
                title: 'Event 21',
                thumbnail: 'https://placehold.co/300x200',
                description: 'This is a description',
                url: 'https://www.google.com',
                platform: 'Twitch',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100,
                time_of_event: 'Wed, 27 July 2016 07:45:00 UTC',
                host: 'hostname',
                entryfee: 0,
                prizes: ['prize1', 'prize2', 'prize3'],
            },
        ],
    };
    return data;
};

export const getSidebarEvents = async () => {
    // current and upcoming? we want only ours so maybe query api for user's events (current and upcoming)
    // but homepage might have current events that are popular (or do this for discover only - homepage is curated only for user)
    // but in the latter case it makes the sidebar obsolete... hmm
    // UI/UX INTERNS ASSEMBLE
    return await getCurrentEvents();
};
