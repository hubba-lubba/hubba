// arrays that hold events and orgs persistent to session
// initialize seed/mock data here.

// user information to load onto webpage: username, profile image, followed streams, events, INBOX

import React, { createContext, useEffect, useState } from 'react';
import { Event } from '@/features/events/types';

interface EventsContextType {
    eventsData: Event[];
    setEventsData: (event: Event[]) => void;
}

export const EventsContext = createContext<EventsContextType>(null!);

export const EventsProvider = ({ children }: React.PropsWithChildren<object>) => {
    const [eventsData, setEventsData] = useState<Event[]>([]);

    useEffect(() => {
        const events = [
            {
                event_id: '1',
                host_org: '2',
                name: `Esports Tournament: League of Legends`,
                thumbnail: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d78a4491-b47d-45fe-9e15-fc270a0788bc/dg026nn-a46c297a-1af9-4a31-ab2d-3ff76ee93649.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3OGE0NDkxLWI0N2QtNDVmZS05ZTE1LWZjMjcwYTA3ODhiY1wvZGcwMjZubi1hNDZjMjk3YS0xYWY5LTRhMzEtYWIyZC0zZmY3NmVlOTM2NDkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qH00h9c7Xdg3QeTEJnt0ZGu70cV0NsJ4esWWnGyCQGc',
                description: 'Compete in our annual League of Legends tournament and prove your skills!',
                channel: 'Riot Games',
                platform: 'lolesports',
                tags: ['gaming', 'esports', 'League of Legends'],
                time_of: new Date('2024-03-31T08:45:00Z'),
                status: 1,
                prizes: ['Cash Prize', 'Exclusive In-Game Items'],
                attendees: ['1', '3'],
                url: 'https://example.com/https://lolesports.com/',
            },
            {
                event_id: '2',
                host_org: '3',
                name: 'Online Gaming Marathon',
                thumbnail: 'https://gaming-marathon.ro/wp-content/uploads/2022/12/KV-LANDING-PAGE-1.png',
                description: 'Join us for a 24-hour gaming marathon where we\'ll play various online games together!',
                channel: 'Gaming Society',
                platform: 'YouTube',
                tags: ['gaming', 'marathon', 'online gaming'],
                time_of: new Date('2024-03-31T08:45:00Z'),
                status: 1,
                prizes: ['Streaming Equipment', 'Gaming Merchandise'],
                attendees: ['2'],
                url: 'https://gaming-marathon.ro/',
            },
            {
                event_id: '3',
                host_org: '4',
                name: 'Fortnite Battle Royale Event',
                thumbnail: 'https://cdn2.unrealengine.com/fortnite-the-big-bang-live-event-1920x1080-8cc212a8f610.jpg',
                description: 'Join us for an epic Fortnite Battle Royale event where we\'ll battle it out for victory royale!',
                channel: 'Fortnite Fanatics',
                platform: 'Discord',
                tags: ['gaming', 'Fortnite', 'Battle Royale'],
                time_of: new Date('2050-12-31T12:00:00Z'),
                status: 0,
                prizes: ['V-Bucks', 'Cosmetic Items'],
                attendees: [],
                url: 'https://fortnitetracker.com/events',
            },
            {
                event_id: '4',
                host_org: '5',
                name: 'FIFA World Cup: Virtual Edition',
                thumbnail: 'https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/world-cup/common/f23-worldcup-featureimg-16x9.jpg.adapt.crop16x9.1023w.jpg',
                description: 'Experience the thrill of the FIFA World Cup in our virtual edition tournament!',
                channel: 'Virtual FIFA Federation',
                platform: 'Discord',
                tags: ['gaming', 'esports', 'FIFA'],
                time_of: new Date('2050-12-31T12:00:00Z'),
                status: 0,
                prizes: ['Cash Prize', 'Exclusive In-Game Items'],
                attendees: ['4'],
                url: 'https://www.ea.com/games/fifa/fifa-23/world-cup',
            },
            {
                event_id: '5',
                host_org: '6',
                name: 'Overwatch League Championship',
                thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKD6KLpql4_pf0WGa7eZYXLfLj9hnZz9vRnjcN65ybRA&s',
                description: 'Witness the best teams compete in the Overwatch League Championship for ultimate glory!',
                channel: 'Overwatch League',
                platform: 'YouTube',
                tags: ['gaming', 'esports', 'Overwatch'],
                time_of: new Date('2050-12-31T12:00:00Z'),
                status: 0,
                prizes: ['Championship Trophy', 'Exclusive Skins'],
                attendees: ['4'],
                url: 'https://esports.overwatch.com/en-us',
            },
            {
                event_id: '6',
                host_org: '1',
                name: 'Minecraft Building Competition',
                thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEUYiFULhno1iNfiMqh4uyvpmcJzNDqsmfr3nPJY4p&s',
                description: 'Show off your creativity in our Minecraft Building Competition and win amazing prizes!',
                channel: 'BlockCrafters Community',
                platform: 'Discord',
                tags: ['gaming', 'Minecraft', 'Building'],
                time_of: new Date('2050-12-31T12:00:00Z'),
                status: 0,
                prizes: ['Gift Cards', 'Exclusive Blocks'],
                attendees: [],
                url: 'https://education.minecraft.net/en-us/resources/global-build-challenge',
            },
            {
                event_id: '7',
                host_org: '6',
                name: 'Super Smash Bros. Ultimate Tournament',
                thumbnail: 'https://i.ticketweb.com/i/00/09/57/08/29_Original.jpg?v=6',
                description: 'Compete in our Super Smash Bros. Ultimate tournament and emerge as the champion!',
                channel: 'Smash Masters Association',
                platform: 'Twitch',
                tags: ['gaming', 'Super Smash Bros.', 'Fighting'],
                time_of: new Date('2050-12-31T12:00:00Z'),
                status: 0,
                prizes: ['Cash Prize', 'Exclusive Characters'],
                attendees: [],
                url: 'https://www.twitch.tv/directory/category/super-smash-bros-ultimate',
            },
            {
                event_id: '8',
                host_org: '6',
                name: 'World of Warcraft Raid Night',
                thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq8Dwa9TbJewbU6MC6aa-1EvG9Arxay0LT-1psaFPcXA&s',
                description: 'Gather your party and embark on an epic raid night adventure in World of Warcraft!',
                channel: 'Azeroth Raiders Guild',
                platform: 'Discord',
                tags: ['gaming', 'World of Warcraft', 'MMORPG'],
                time_of: new Date('2050-12-31T12:00:00Z'),
                status: 0,
                prizes: ['Legendary Loot', 'Mounts'],
                attendees: [],
                url: 'https://worldofwarcraft.blizzard.com/en-gb/guild/eu/antonidas/raid-night',
            }
        ];
        
        setEventsData(events as Event[]);
    }, []);

    return (
        <EventsContext.Provider
            value={{
                eventsData,
                setEventsData,
            }}
        >
            {children}
        </EventsContext.Provider>
    );
};
