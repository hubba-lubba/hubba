import { Card } from '@/components/layout';
import { Shelf } from '@/components/layout';
import { useEffect } from 'react';
const TEST = {
    current_events: [
        {
            id: '1',
            title: 'Event 1',
            thumbnail: 'https://placehold.co/600x400',
            description: 'This is a description',
            url: 'https://www.google.com',
            platform: 'Twitch',
            tags: ['tag1', 'tag2', 'tag3'],
            viewer_count: 100,
        },
        {
            id: '2',
            title: 'Event 2',
            thumbnail: 'https://placehold.co/600x400',
            description: 'This is a description',
            url: 'https://www.google.com',
            platform: 'Twitch',
            tags: ['tag1', 'tag2', 'tag3'],
            viewer_count: 100,
        },
        {
            id: '3',
            title: 'Event 3',
            thumbnail: 'https://placehold.co/600x400',
            description: 'This is a description',
            url: 'https://www.google.com',
            platform: 'Twitch',
            tags: ['tag1', 'tag2', 'tag3'],
            viewer_count: 100,
        },
    ],
    upcoming_events: [
        {
            id: '4',
            title: 'Event 4',
            thumbnail: 'https://placehold.co/300x200',
            description: 'This is a description',
            url: 'https://www.google.com',
            platform: 'Twitch',
            tags: ['tag1', 'tag2', 'tag3'],
            viewer_count: 100,
        },
        {
            id: '5',
            title: 'Event 5',
            thumbnail: 'https://placehold.co/300x200',
            description: 'This is a description',
            url: 'https://www.google.com',
            platform: 'Twitch',
            tags: ['tag1', 'tag2', 'tag3'],
            viewer_count: 100,
        },
        {
            id: '12',
            title: 'Event 24',
            thumbnail: 'https://placehold.co/300x200',
            description: 'This is a description',
            url: 'https://www.google.com',
            platform: 'Twitch',
            tags: ['tag1', 'tag2', 'tag3'],
            viewer_count: 100,
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
        },
    ],
    live: [
        {
            id: '7',
            title: 'Live 1',
            thumbnail: 'https://placehold.co/300x200',
            description: 'This is a description',
            url: 'https://www.google.com',
            platform: 'Twitch',
            tags: ['tag1', 'tag2', 'tag3'],
            viewer_count: 100,
        },
        {
            id: '8',
            title: 'Event 8',
            thumbnail: 'https://placehold.co/300x200',
            description: 'This is a description',
            url: 'https://www.google.com',
            platform: 'Twitch',
            tags: ['tag1', 'tag2', 'tag3'],
            viewer_count: 100,
        },
        {
            id: '9',
            title: 'Event 9',
            thumbnail: 'https://placehold.co/300x200',
            description: 'This is a description',
            url: 'https://www.google.com',
            platform: 'Twitch',
            tags: ['tag1', 'tag2', 'tag3'],
            viewer_count: 100,
        },
        {
            id: '9',
            title: 'Event 9',
            thumbnail: 'https://placehold.co/300x200',
            description: 'This is a description',
            url: 'https://www.google.com',
            platform: 'Twitch',
            tags: ['tag1', 'tag2', 'tag3'],
            viewer_count: 100,
        },
        {
            id: '9',
            title: 'Event 9',
            thumbnail: 'https://placehold.co/300x200',
            description: 'This is a description',
            url: 'https://www.google.com',
            platform: 'Twitch',
            tags: ['tag1', 'tag2', 'tag3'],
            viewer_count: 100,
        },
    ],
};

export const Home = () => {
    // put this into each feature as a component
    useEffect(() => {
        // fetch data
        // fetch events, upcoming, and live to be displayed on homepage
        // put each into its own array state
        // for each array, map and create a thumbnail
        // once this is complete, move into individual features as a component
    }, []);
    return (
        <div className="flex h-full w-full flex-col items-start justify-start">
            {/* Current Events */}
            {/* Upcoming Events */}
            {/* Live */}
            <Shelf title="Current Events">
                {TEST.current_events.map((event, index) => (
                    <Card key={index} variant="large" {...event}></Card>
                ))}
            </Shelf>
            <Shelf title="Upcoming Events">
                {TEST.upcoming_events.map((event, index) => (
                    <Card key={index} {...event}></Card>
                ))}
            </Shelf>
            <Shelf title="Live">
                {TEST.live.map((event, index) => (
                    <Card key={index} {...event}></Card>
                ))}
            </Shelf>
        </div>
    );
};
