import { User } from '@/features/users/types';
import { Event } from '../types';

export const getCurrentEvents = async () => {
    const data = {
        events: [
            {
                id: '1',
                title:"Esports Tournament: League of Legends", 
                thumbnail:"https://example.com/league_of_legends_thumbnail.jpg", 
                description:"Compete in our annual League of Legends tournament and prove your skills!", 
                url:"https://example.com/league_of_legends_tournament", 
                tags:["gaming", "esports", "League of Legends"], 
                time_of_event:"2024-03-31 08:45:00 UTC", 
                status:"live", 
                platform:"Gamer's Arena", 
                prizes:["Cash Prize", "Exclusive In-Game Items"]
            },
            {
                id: '2',
                title: "Online Gaming Marathon", 
                thumbnail: "https://example.com/gaming_marathon_thumbnail.jpg", 
                description: "Join us for a 24-hour gaming marathon where we'll play various online games together!", 
                url: "https://example.com/gaming_marathon", 
                tags: ["gaming", "marathon", "online gaming"], 
                time_of_event: "2024-03-31 08:45:00 UTC", 
                status: "live", 
                platform: "Gaming Society", 
                prizes: ["Streaming Equipment", "Gaming Merchandise"]
            },
            {
                id: '2',
                title: "Online Gaming Marathon", 
                thumbnail: "https://example.com/gaming_marathon_thumbnail.jpg", 
                description: "Join us for a 24-hour gaming marathon where we'll play various online games together!", 
                url: "https://example.com/gaming_marathon", 
                tags: ["gaming", "marathon", "online gaming"], 
                time_of_event: "2024-03-31 08:45:00 UTC", 
                status: "live", 
                platform: "Gaming Society", 
                prizes: ["Streaming Equipment", "Gaming Merchandise"]
            }
        ],
    };
    return data;
};

export const getUpcomingEvents = async () => {
    const data = {
        events: [
            {
                id: '4',
                title: "Fortnite Battle Royale Event", 
                thumbnail: "https://example.com/fortnite_thumbnail.jpg", 
                description: "Join us for an epic Fortnite Battle Royale event where we'll battle it out for victory royale!", 
                url: "https://example.com/fortnite_event", 
                tags: ["gaming", "Fortnite", "Battle Royale"], 
                time_of_event: "2050-12-31 12:00:00 UTC", 
                status: "upcoming", 
                platform: "Fortnite Fanatics", 
                prizes: ["V-Bucks", "Cosmetic Items"]
            },
            {
                id: '5',
                title: "FIFA World Cup: Virtual Edition", 
                thumbnail: "https://example.com/fifa_virtual_thumbnail.jpg", 
                description: "Experience the thrill of the FIFA World Cup in our virtual edition tournament!", 
                url: "https://example.com/fifa_virtual_cup", 
                tags: ["gaming", "esports", "FIFA"], 
                time_of_event: "2050-12-31 12:00:00 UTC", 
                status: "upcoming", 
                platform: "Virtual FIFA Federation", 
                prizes: ["Cash Prize", "Exclusive In-Game Items"]
            },
            {
                id: '6',
                title: "Overwatch League Championship", 
                thumbnail: "https://example.com/overwatch_championship_thumbnail.jpg", 
                description: "Witness the best teams compete in the Overwatch League Championship for ultimate glory!", 
                url: "https://example.com/overwatch_championship", 
                tags: ["gaming", "esports", "Overwatch"], 
                time_of_event: "2050-12-31 12:00:00 UTC", 
                status: "upcoming", 
                platform: "Overwatch League", 
                prizes: ["Championship Trophy", "Exclusive Skins"]
            },
            {
                id: '7',
                title: "Minecraft Building Competition", 
                thumbnail: "https://example.com/minecraft_building_thumbnail.jpg", 
                description: "Show off your creativity in our Minecraft Building Competition and win amazing prizes!", 
                url: "https://example.com/minecraft_competition", 
                tags: ["gaming", "Minecraft", "Building"], 
                time_of_event: "2050-12-31 12:00:00 UTC", 
                status: "upcoming", 
                platform: "BlockCrafters Community", 
                prizes: ["Gift Cards", "Exclusive Blocks"]
            },
            {
                id: '8',
                title: "Super Smash Bros. Ultimate Tournament", 
                thumbnail: "https://example.com/smash_bros_thumbnail.jpg", 
                description: "Compete in our Super Smash Bros. Ultimate tournament and emerge as the champion!", 
                url: "https://example.com/smash_bros_tournament", 
                tags: ["gaming", "Super Smash Bros.", "Fighting"], 
                time_of_event: "2050-12-31 12:00:00 UTC", 
                status: "upcoming", 
                platform: "Smash Masters Association", 
                prizes: ["Cash Prize", "Exclusive Characters"]
            },
            {
                id: '9',
                title: "World of Warcraft Raid Night", 
                thumbnail: "https://example.com/wow_raid_thumbnail.jpg", 
                description: "Gather your party and embark on an epic raid night adventure in World of Warcraft!", 
                url: "https://example.com/wow_raid_night", 
                tags: ["gaming", "World of Warcraft", "MMORPG"], 
                time_of_event: "2050-12-31 12:00:00 UTC", 
                status: "upcoming", 
                platform: "Azeroth Raiders Guild", 
                prizes: ["Legendary Loot", "Mounts"]
            },
            {
                id: '10',
                title: "Rocket League Championship", 
                thumbnail: "https://example.com/rocket_league_championship_thumbnail.jpg", 
                description: "Compete in our Rocket League Championship and score amazing goals to claim victory!", 
                url: "https://example.com/rocket_league_championship", 
                tags: ["gaming", "Rocket League", "Sports"], 
                time_of_event: "2050-12-31 12:00:00 UTC", 
                status: "upcoming", 
                platform: "Rocket League Federation", 
                prizes: ["Cash Prize", "Exclusive Car Designs"]
            },
            {
                id: '11',
                title: "Dota 2 International Tournament", 
                thumbnail: "https://example.com/dota2_international_thumbnail.jpg", 
                description: "Prepare for intense battles in the Dota 2 International Tournament and compete for the Aegis of Champions!", 
                url: "https://example.com/dota2_international", 
                tags: ["gaming", "esports", "Dota 2"], 
                time_of_event: "2050-12-31 12:00:00 UTC", 
                status: "upcoming", 
                platform: "Valve Corporation", 
                prizes: ["Aegis of Champions", "Cash Prize"]
            },
            {
                id: '12',
                title: "Apex Legends Battle Royale Event", 
                thumbnail: "https://example.com/apex_legends_thumbnail.jpg", 
                description: "Join us for an adrenaline-fueled Apex Legends Battle Royale event where only the best squad survives!", 
                url: "https://example.com/apex_legends_event", 
                tags: ["gaming", "Apex Legends", "Battle Royale"], 
                time_of_event: "2050-12-31 12:00:00 UTC", 
                status: "upcoming", 
                platform: "Legends Arena", 
                prizes: ["Apex Coins", "Exclusive Skins"]
            },
            {
                id: '13',
                title: "Hearthstone Championship", 
                thumbnail: "https://example.com/hearthstone_championship_thumbnail.jpg", 
                description: "Compete in our Hearthstone Championship and showcase your strategic card-playing skills!", 
                url: "https://example.com/hearthstone_championship", 
                tags: ["gaming", "Hearthstone", "Card Game"], 
                time_of_event: "2050-12-31 12:00:00 UTC", 
                status: "upcoming", 
                platform: "Hearthstone Masters League", 
                prizes: ["Championship Trophy", "Card Packs"]
            },
            {
                id: '14',
                title: "Pokémon GO Community Day", 
                thumbnail: "https://example.com/pokemon_go_community_day_thumbnail.jpg", 
                description: "Join us for a Pokémon GO Community Day where we'll catch rare Pokémon and complete challenges together!", 
                url: "https://example.com/pokemon_go_community_day", 
                tags: ["gaming", "Pokémon GO", "Mobile"], 
                time_of_event: "2050-12-31 12:00:00 UTC", 
                status: "upcoming", 
                platform: "Pokémon Trainers Club", 
                prizes: ["Exclusive Pokémon Encounters", "Incubators"]
            },
            {
                id: '15',
                title: "Virtual Reality Gaming Expo", 
                thumbnail: "https://example.com/vr_gaming_expo_thumbnail.jpg", 
                description: "Experience the future of gaming in our Virtual Reality Gaming Expo with cutting-edge VR technology!", 
                url: "https://example.com/vr_gaming_expo", 
                tags: ["gaming", "Virtual Reality", "Expo"], 
                time_of_event: "2050-12-31 12:00:00 UTC", 
                status: "upcoming", 
                platform: "VR Innovations", 
                prizes: ["VR Headsets", "Game Demos"]
            }
        ],
    };
    return data;
};

export const getSidebarEvents = async (user: User): Promise<Event[]> => {
    // current and upcoming? we want only ours so maybe query api for user's events (current and upcoming)
    // but homepage might have current events that are popular (or do this for discover only - homepage is curated only for user)
    // but in the latter case it makes the sidebar obsolete... hmm
    // UI/UX INTERNS ASSEMBLE
    const data = Promise.all(
        user.joined_event_ids.map(async (id) => (await getEvent(id)).event),
    );
    return data;
};

export const getEvent = async (id: string): Promise<{ event: Event }> => {
    // get event by id
    // return event
    const data = {
        event: {
            id: id,
            title: `event XD ${id}`,
            thumbnail: 'https://placehold.co/500x300',
            description: 'This is a description',
            url: 'https://www.google.com',
            platform: 'Twitch',
            tags: ['tag1', 'tag2', 'tag3'],
            viewer_count: 100,
            time_of_event: new Date('Wed, 27 July 2016 07:45:00 UTC'),
            status: 'Live',
            host: 'hostname',
            prizes: ['prize1', 'prize2', 'prize3'],
        },
    };

    return data;
};
