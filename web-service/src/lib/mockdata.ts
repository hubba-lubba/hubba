const events = [
    {
        event_id: '1',
        host_org: '2',
        name: `Esports Tournament: League of Legends`,
        thumbnail:
            'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d78a4491-b47d-45fe-9e15-fc270a0788bc/dg026nn-a46c297a-1af9-4a31-ab2d-3ff76ee93649.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3OGE0NDkxLWI0N2QtNDVmZS05ZTE1LWZjMjcwYTA3ODhiY1wvZGcwMjZubi1hNDZjMjk3YS0xYWY5LTRhMzEtYWIyZC0zZmY3NmVlOTM2NDkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qH00h9c7Xdg3QeTEJnt0ZGu70cV0NsJ4esWWnGyCQGc',
        description:
            'Compete in our annual League of Legends tournament and prove your skills!',
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
        thumbnail:
            'https://gaming-marathon.ro/wp-content/uploads/2022/12/KV-LANDING-PAGE-1.png',
        description:
            "Join us for a 24-hour gaming marathon where we'll play various online games together!",
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
        thumbnail:
            'https://cdn2.unrealengine.com/fortnite-the-big-bang-live-event-1920x1080-8cc212a8f610.jpg',
        description:
            "Join us for an epic Fortnite Battle Royale event where we'll battle it out for victory royale!",
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
        thumbnail:
            'https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/world-cup/common/f23-worldcup-featureimg-16x9.jpg.adapt.crop16x9.1023w.jpg',
        description:
            'Experience the thrill of the FIFA World Cup in our virtual edition tournament!',
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
        thumbnail:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKD6KLpql4_pf0WGa7eZYXLfLj9hnZz9vRnjcN65ybRA&s',
        description:
            'Witness the best teams compete in the Overwatch League Championship for ultimate glory!',
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
        thumbnail:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEUYiFULhno1iNfiMqh4uyvpmcJzNDqsmfr3nPJY4p&s',
        description:
            'Show off your creativity in our Minecraft Building Competition and win amazing prizes!',
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
        thumbnail:
            'https://i.ticketweb.com/i/00/09/57/08/29_Original.jpg?v=6',
        description:
            'Compete in our Super Smash Bros. Ultimate tournament and emerge as the champion!',
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
        thumbnail:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq8Dwa9TbJewbU6MC6aa-1EvG9Arxay0LT-1psaFPcXA&s',
        description:
            'Gather your party and embark on an epic raid night adventure in World of Warcraft!',
        channel: 'Azeroth Raiders Guild',
        platform: 'Discord',
        tags: ['gaming', 'World of Warcraft', 'MMORPG'],
        time_of: new Date('2050-12-31T12:00:00Z'),
        status: 0,
        prizes: ['Legendary Loot', 'Mounts'],
        attendees: [],
        url: 'https://worldofwarcraft.blizzard.com/en-gb/guild/eu/antonidas/raid-night',
    },
];

const orgs = [
    {
        org_id: '1',
        name: 'Gaming Enthusiasts Club',
        image: 'https://d2n9ha3hrkss16.cloudfront.net/uploads/stage/stage_image/47068/optimized_product_thumb_stage.jpg',
        description:
            'A community of passionate gamers who love discussing and playing video games together. Join us for exciting events and discussions!',
        channel: 'gaming_enthusiasts_club',
        owner: '2',
        moderators: [],
        users: ['1'],
        events: ['6'],
        created: new Date('2023-04-15'),
    },
    {
        org_id: '2',
        name: 'eSports Alliance',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdaVp5uktesNOsWFFErap-eWGqCEcDHhvd5VL84BoEog&s',
        description:
            'Join the eSports Alliance and compete in thrilling tournaments across various gaming genres. Showcase your skills and win exciting prizes!',
        channel: 'esports_alliance',
        owner: '2',
        moderators: ['2'],
        users: ['2', '4'],
        events: ['1'],
        created: new Date('2023-05-20'),
    },
    {
        org_id: '3',
        name: 'Streamers United',
        image: 'https://pbs.twimg.com/profile_images/935120286420291584/uQm6xuKR_200x200.jpg',
        description:
            'A community of streamers dedicated to supporting and promoting each other. Join us to grow your streaming career!',
        channel: 'streamers_united',
        owner: '3',
        moderators: ['3'],
        users: ['3'],
        events: ['2'],
        created: new Date('2023-06-25'),
    },
    {
        org_id: '4',
        name: 'Casual Gamers Guild',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5Ym2CADk_IDR6Di94NNRZTO3yxj3dVe6brYCW1DTxA&s',
        description:
            'Relax and unwind with fellow casual gamers in the Casual Gamers Guild. Join us for laid-back gaming sessions and fun discussions!',
        channel: 'casual_gamers_guild',
        owner: '4',
        moderators: ['4', '5'],
        users: ['4', '5'],
        events: ['4'],
        created: new Date('2023-07-30'),
    },
    {
        org_id: '5',
        name: 'Tech Enthusiasts Society',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnfbYn9MteZtc0-seLfd7mp8tyeLYUQnbuP6LzqrLSgQ&s',
        description:
            'A community of technology enthusiasts sharing knowledge, insights, and updates about the latest tech trends. Join us to stay informed!',
        channel: 'tech_enthusiasts_society',
        owner: '2',
        moderators: ['2'],
        users: [],
        events: ['7'],
        created: new Date('2023-08-05'),
    },
    {
        org_id: '6',
        name: 'Creative Minds Collective',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbLcAVttEuiIH8Hwxhg0vJVIz1PvjRO5Lemn_tquUZZQ&s',
        description:
            'Join the Creative Minds Collective to connect with fellow artists, designers, and creators. Share your work, get feedback, and collaborate on projects!',
        channel: 'creative_minds_collective',
        owner: '2',
        moderators: ['2'],
        users: [],
        events: ['5', '7', '8'],
        created: new Date('2023-09-10'),
    },
];

const users = [
    {
        user_id: '1',
        username: 'Gamer123',
        email: 'gamer123@example.com',
        profile_image: 'https://wallpapers.com/images/featured/gaming-profile-pictures-xpcd6q5uud2i45v8.jpg',
        bio: 'Passionate gamer who loves exploring new worlds and completing challenges.',
        followers: [],
        following: ['2','4'],
        streaming_status: 0,
        channel: '',
        video_urls: [],
        joined_events: ['1'],
        past_events: [],
        joined_orgs: [1],
        owned_orgs: [],
        platforms: [],
    },
    {
        user_id: '2',
        username: 'Valkyrae',
        email: 'Valkyrae@example.com',
        profile_image: 'https://yt3.googleusercontent.com/0Qu_iyV5XEUmy7MBd46TqRzsMuTED6M5zvunG8W6GjOrRn3pgs-BSTLREWopbkmzQIC66R_FPDs=s176-c-k-c0x00ffffff-no-rj',
        bio: 'hi! I am a streamer on YouTube!',
        followers: ['1'],
        following: ['3','4'],
        streaming_status: 1,
        channel: 'valkyrae',
        video_urls: ['https://www.youtube.com/watch?v=WzIygALa6a0', 'https://www.youtube.com/watch?v=0vMDoul1NfQ'],
        joined_events: ['2'],
        past_events: [],
        joined_orgs: ['2'],
        owned_orgs: ['1', '2', '5', '6'],
        platforms: ['Twitch', 'Discord', 'YouTube'],
    },
    {
        user_id: '3',
        username: 'xQc',
        email: 'xQc@example.com',
        profile_image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/xqc-profile_image-9298dca608632101-70x70.jpeg',
        bio: 'Pro gamer specializing in competitive multiplayer games. Catch me live on Twitch!',
        followers: ['2','4' ],
        following: ['4'],
        streaming_status: 1,
        channel: 'xQc',
        video_urls: ['https://www.twitch.tv/videos/2112925897', 'https://www.twitch.tv/videos/2111857126'],
        joined_events: ['1'],
        past_events: [],
        joined_orgs: ['3'],
        owned_orgs: ['3'],
        platforms: ['Twitch', 'YouTube'],
    },
    {
        user_id: '4',
        username: 'CaseOh',
        email: 'caseoh_@example.com',
        profile_image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ef28ba12-c8ed-46d4-838b-a4c95ef5b469-profile_image-70x70.png',
        bio: 'Join me on epic gaming adventures! Streaming daily on Twitch and YouTube.',
        followers: ['1','2','3'],
        following: ['3', '5'],
        streaming_status: 1,
        channel: 'caseoh_',
        video_urls: ['https://www.twitch.tv/caseoh_/clip/DeterminedSeductiveOrangeDancingBaby-3sXV2RmiXQ7LTyIo'],
        joined_events: ['4', '5'],
        past_events: [],
        joined_orgs: ['2','4'],
        owned_orgs: ['4'],
        platforms: ['Twitch', 'YouTube'],
    },
    {
        user_id: '5',
        username: 'ImpulseSV',
        email: 'impulse@example.com',
        profile_image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2dd0feb9-1117-4ac4-9d46-0d547e382529-profile_image-70x70.png',
        bio: 'Relax and unwind with me as I play your favorite games. Streaming on Twitch!',
        followers: ['4'],
        following: [],
        streaming_status: 1,
        channel: 'impulse',
        video_urls: ['https://www.twitch.tv/videos/2113485196'],
        joined_events: [],
        past_events: [],
        joined_orgs: ['4'],
        owned_orgs: [],
        platforms: ['Twitch', 'YouTube'],
    },
];