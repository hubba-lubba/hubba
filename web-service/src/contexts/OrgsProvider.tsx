// arrays that hold events and orgs persistent to session
// initialize seed/mock data here.

// user information to load onto webpage: username, profile image, followed streams, events, INBOX

import React, { createContext, useEffect, useState } from 'react';
import { Org } from '@/features/orgs/types';

interface OrgsContextType {
    orgsData: Org[];
    setOrgsData: (org: Org[]) => void;
}

export const OrgsContext = createContext<OrgsContextType>(null!);

export const OrgsProvider = ({ children }: React.PropsWithChildren<object>) => {
    const [orgsData, setOrgsData] = useState<Org[]>([]);

    useEffect(() => {
        const orgs = [
            {
                org_id: 1,
                name: 'Gaming Enthusiasts Club',
                image: 'https://d2n9ha3hrkss16.cloudfront.net/uploads/stage/stage_image/47068/optimized_product_thumb_stage.jpg',
                description: 'A community of passionate gamers who love discussing and playing video games together. Join us for exciting events and discussions!',
                channel: 'gaming_enthusiasts_club',
                owner: 2,
                moderators: [],
                users: [1],
                events: [6],
                created: new Date('2023-04-15'),
            },
            {
                org_id: 2,
                name: 'eSports Alliance',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdaVp5uktesNOsWFFErap-eWGqCEcDHhvd5VL84BoEog&s',
                description: 'Join the eSports Alliance and compete in thrilling tournaments across various gaming genres. Showcase your skills and win exciting prizes!',
                channel: 'esports_alliance',
                owner: 2,
                moderators: [2],
                users: [2, 4],
                events: [1],
                created: new Date('2023-05-20'),
            },
            {
                org_id: 3,
                name: 'Streamers United',
                image: 'https://pbs.twimg.com/profile_images/935120286420291584/uQm6xuKR_200x200.jpg',
                description: 'A community of streamers dedicated to supporting and promoting each other. Join us to grow your streaming career!',
                channel: 'streamers_united',
                owner: 3,
                moderators: [3],
                users: [3],
                events: [2],
                created: new Date('2023-06-25'),
            },
            {
                org_id: 4,
                name: 'Casual Gamers Guild',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5Ym2CADk_IDR6Di94NNRZTO3yxj3dVe6brYCW1DTxA&s',
                description: 'Relax and unwind with fellow casual gamers in the Casual Gamers Guild. Join us for laid-back gaming sessions and fun discussions!',
                channel: 'casual_gamers_guild',
                owner: 4,
                moderators: [4, 5],
                users: [4, 5],
                events: [4],
                created: new Date('2023-07-30'),
            },
            {
                org_id: 5,
                name: 'Tech Enthusiasts Society',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnfbYn9MteZtc0-seLfd7mp8tyeLYUQnbuP6LzqrLSgQ&s',
                description: 'A community of technology enthusiasts sharing knowledge, insights, and updates about the latest tech trends. Join us to stay informed!',
                channel: 'tech_enthusiasts_society',
                owner: 2,
                moderators: [2],
                users: [],
                events: [7],
                created: new Date('2023-08-05'),
            },
            {
                org_id: 6,
                name: 'Creative Minds Collective',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbLcAVttEuiIH8Hwxhg0vJVIz1PvjRO5Lemn_tquUZZQ&s',
                description: 'Join the Creative Minds Collective to connect with fellow artists, designers, and creators. Share your work, get feedback, and collaborate on projects!',
                channel: 'creative_minds_collective',
                owner: 2,
                moderators: [2],
                users: [],
                events: [5, 7, 8],
                created: new Date('2023-09-10'),
            },
        ];
        setOrgsData(orgs as Org[]);
    }, []);

    return (
        <OrgsContext.Provider
            value={{
                orgsData,
                setOrgsData,
            }}
        >
            {children}
        </OrgsContext.Provider>
    );
};
