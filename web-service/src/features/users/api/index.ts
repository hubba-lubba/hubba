export * from './users';

export const getVideoLinks = async () => {
    const data = {
        videos: [
            {
                id: 'vid1',
                title: 'title1',
                name: 'vid1',
                thumbnail: 'https://placehold.co/600x400',
                description: 'vid desc',
                url: 'https://www.youtube.com/watch?v=f8p7RR-IPGY',
                platform: 'YouTube',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100

            },
            {
                id: 'vid2',
                title: 'title2',
                name: 'vid2',
                thumbnail: 'https://placehold.co/600x400',
                description: 'vid desc',
                url: 'https://www.youtube.com/watch?v=ZdhLGlIDNPs',
                platform: 'YouTube',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100
            },
            {
                id: 'vid3',
                title: 'title3',
                name: 'vid3',
                thumbnail: 'https://placehold.co/600x400',
                description: 'vid desc',
                url: 'https://www.youtube.com/watch?v=Bkstj0BtjXE',
                platform: 'YouTube',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100
            },
            {
                id: 'vid4',
                title: 'title4',
                name: 'vid4',
                thumbnail: 'https://placehold.co/600x400',
                description: 'vid desc',
                url: 'https://www.youtube.com/watch?v=Bkstj0BtjXE',
                platform: 'YouTube',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100
            },
            {
                id: 'vid5',
                title: 'title4',
                name: 'vid4',
                thumbnail: 'https://placehold.co/600x400',
                description: 'vid desc',
                url: 'https://www.youtube.com/watch?v=Bkstj0BtjXE',
                platform: 'YouTube',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100
            },
            {
                id: 'vid6',
                title: 'title4',
                name: 'vid4',
                thumbnail: 'https://placehold.co/600x400',
                description: 'vid desc',
                url: 'https://www.youtube.com/watch?v=Bkstj0BtjXE',
                platform: 'YouTube',
                tags: ['tag1', 'tag2', 'tag3'],
                viewer_count: 100
            }
        ]
    };
    return data;
}