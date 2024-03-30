from sqlalchemy import create_engine
from domains.models.user import User
from domains.models.events import Events
from domains.models.base import Base
from sqlalchemy.orm import Session
from sqlalchemy_utils import database_exists, create_database
from config import *
from domains.models.events import event_moderator_table
from google.cloud import pubsub

#WARNING!!! DO NOT USE THIS IN PRODUCTION uwu. EVEN HAVING THIS HERE IS VERY BAD PRACTICE FOR OBVIOUS REASONS
RESET_DB = True

engine = create_engine(f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOSTNAME}:{DB_PORT}/{DB_NAME}",
                       echo=True, pool_pre_ping=True)
if not database_exists(engine.url): create_database(engine.url)

if RESET_DB:
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    # Create a publisher factory.
    publisher_factory = pubsub.PublisherFactory()

    # Create a publisher.
    publisher = publisher_factory.create_publisher(topic_name='events-mockdata')

    with Session(engine) as session:

        #TODO: Write a script to populate the database with some users
        event1 = Events("Esports Tournament: League of Legends", "https://example.com/league_of_legends_thumbnail.jpg", "Compete in our annual League of Legends tournament and prove your skills!", "https://example.com/league_of_legends_tournament", ["gaming", "esports", "League of Legends"], 'Wed, 27 July 2016 07:45:00 UTC', "upcoming", "Gamer's Arena", ["Cash Prize", "Exclusive In-Game Items"])

        event2 = Events("Online Gaming Marathon", "https://example.com/gaming_marathon_thumbnail.jpg", "Join us for a 24-hour gaming marathon where we'll play various online games together!", "https://example.com/gaming_marathon", ["gaming", "marathon", "online gaming"], 'Wed, 27 July 2016 07:45:00 UTC', "upcoming", "Gaming Society", ["Streaming Equipment", "Gaming Merchandise"])

        event3 = Events("Call of Duty: Warzone Tournament", "https://example.com/call_of_duty_thumbnail.jpg", "Test your skills in our Call of Duty: Warzone tournament and compete for glory!", "https://example.com/warzone_tournament", ["gaming", "esports", "Call of Duty"], 'Wed, 27 July 2016 07:45:00 UTC', "upcoming", "Warzone Warriors", ["Cash Prize", "Exclusive In-Game Items"])

        event4 = Events("Fortnite Battle Royale Event", "https://example.com/fortnite_thumbnail.jpg", "Join us for an epic Fortnite Battle Royale event where we'll battle it out for victory royale!", "https://example.com/fortnite_event", ["gaming", "Fortnite", "Battle Royale"], 'Wed, 27 July 2016 07:45:00 UTC', "upcoming", "Fortnite Fanatics", ["V-Bucks", "Cosmetic Items"])

        event5 = Events("FIFA World Cup: Virtual Edition", "https://example.com/fifa_virtual_thumbnail.jpg", "Experience the thrill of the FIFA World Cup in our virtual edition tournament!", "https://example.com/fifa_virtual_cup", ["gaming", "esports", "FIFA"], 'Wed, 27 July 2016 07:45:00 UTC', "upcoming", "Virtual FIFA Federation", ["Cash Prize", "Exclusive In-Game Items"])

        event6 = Events("Overwatch League Championship", "https://example.com/overwatch_championship_thumbnail.jpg", "Witness the best teams compete in the Overwatch League Championship for ultimate glory!", "https://example.com/overwatch_championship", ["gaming", "esports", "Overwatch"], 'Wed, 27 July 2016 07:45:00 UTC', "upcoming", "Overwatch League", ["Championship Trophy", "Exclusive Skins"])

        event7 = Events("Minecraft Building Competition", "https://example.com/minecraft_building_thumbnail.jpg", "Show off your creativity in our Minecraft Building Competition and win amazing prizes!", "https://example.com/minecraft_competition", ["gaming", "Minecraft", "Building"], 'Wed, 27 July 2016 07:45:00 UTC', "upcoming", "BlockCrafters Community", ["Gift Cards", "Exclusive Blocks"])

        event8 = Events("Super Smash Bros. Ultimate Tournament", "https://example.com/smash_bros_thumbnail.jpg", "Compete in our Super Smash Bros. Ultimate tournament and emerge as the champion!", "https://example.com/smash_bros_tournament", ["gaming", "Super Smash Bros.", "Fighting"], 'Wed, 27 July 2016 07:45:00 UTC', "upcoming", "Smash Masters Association", ["Cash Prize", "Exclusive Characters"])

        event9 = Events("World of Warcraft Raid Night", "https://example.com/wow_raid_thumbnail.jpg", "Gather your party and embark on an epic raid night adventure in World of Warcraft!", "https://example.com/wow_raid_night", ["gaming", "World of Warcraft", "MMORPG"], 'Wed, 27 July 2016 07:45:00 UTC', "upcoming", "Azeroth Raiders Guild", ["Legendary Loot", "Mounts"])

        event10 = Events("Rocket League Championship", "https://example.com/rocket_league_championship_thumbnail.jpg", "Compete in our Rocket League Championship and score amazing goals to claim victory!", "https://example.com/rocket_league_championship", ["gaming", "Rocket League", "Sports"], 'Wed, 27 July 2016 07:45:00 UTC', "upcoming", "Rocket League Federation", ["Cash Prize", "Exclusive Car Designs"])

        event11 = Events("Dota 2 International Tournament", "https://example.com/dota2_international_thumbnail.jpg", "Prepare for intense battles in the Dota 2 International Tournament and compete for the Aegis of Champions!", "https://example.com/dota2_international", ["gaming", "esports", "Dota 2"], 'Wed, 27 July 2016 07:45:00 UTC', "upcoming", "Valve Corporation", ["Aegis of Champions", "Cash Prize"])

        event12 = Events("Apex Legends Battle Royale Event", "https://example.com/apex_legends_thumbnail.jpg", "Join us for an adrenaline-fueled Apex Legends Battle Royale event where only the best squad survives!", "https://example.com/apex_legends_event", ["gaming", "Apex Legends", "Battle Royale"], 'Wed, 27 July 2016 07:45:00 UTC', "upcoming", "Legends Arena", ["Apex Coins", "Exclusive Skins"])
        
        event13 = Events("Hearthstone Championship", "https://example.com/hearthstone_championship_thumbnail.jpg", "Compete in our Hearthstone Championship and showcase your strategic card-playing skills!", "https://example.com/hearthstone_championship", ["gaming", "Hearthstone", "Card Game"], 'Wed, 27 July 2016 07:45:00 UTC', "upcoming", "Hearthstone Masters League", ["Championship Trophy", "Card Packs"])

        event14 = Events("Pokémon GO Community Day", "https://example.com/pokemon_go_community_day_thumbnail.jpg", "Join us for a Pokémon GO Community Day where we'll catch rare Pokémon and complete challenges together!", "https://example.com/pokemon_go_community_day", ["gaming", "Pokémon GO", "Mobile"], 'Wed, 27 July 2016 07:45:00 UTC', "upcoming", "Pokémon Trainers Club", ["Exclusive Pokémon Encounters", "Incubators"])

        event15 = Events("Virtual Reality Gaming Expo", "https://example.com/vr_gaming_expo_thumbnail.jpg", "Experience the future of gaming in our Virtual Reality Gaming Expo with cutting-edge VR technology!", "https://example.com/vr_gaming_expo", ["gaming", "Virtual Reality", "Expo"], 'Wed, 27 July 2016 07:45:00 UTC', "upcoming", "VR Innovations", ["VR Headsets", "Game Demos"])
        
        # Add event1 and publish action for event1
        session.add(event1)
        publisher.publish(action=True, uuid=event1.event_id)

        # Add event2 and publish action for event2
        session.add(event2)
        publisher.publish(action=True, uuid=event2.event_id)

        # Add event3 and publish action for event3
        session.add(event3)
        publisher.publish(action=True, uuid=event3.event_id)

        # Add event4 and publish action for event4
        session.add(event4)
        publisher.publish(action=True, uuid=event4.event_id)

        # Add event5 and publish action for event5
        session.add(event5)
        publisher.publish(action=True, uuid=event5.event_id)

        # Add event6 and publish action for event6
        session.add(event6)
        publisher.publish(action=True, uuid=event6.event_id)

        # Add event7 and publish action for event7
        session.add(event7)
        publisher.publish(action=True, uuid=event7.event_id)

        # Add event8 and publish action for event8
        session.add(event8)
        publisher.publish(action=True, uuid=event8.event_id)

        # Add event9 and publish action for event9
        session.add(event9)
        publisher.publish(action=True, uuid=event9.event_id)

        # Add event10 and publish action for event10
        session.add(event10)
        publisher.publish(action=True, uuid=event10.event_id)

        # Add event11 and publish action for event11
        session.add(event11)
        publisher.publish(action=True, uuid=event11.event_id)

        # Add event12 and publish action for event12
        session.add(event12)
        publisher.publish(action=True, uuid=event12.event_id)

        # Add event13 and publish action for event13
        session.add(event13)
        publisher.publish(action=True, uuid=event13.event_id)

        # Add event14 and publish action for event14
        session.add(event14)
        publisher.publish(action=True, uuid=event14.event_id)

        # Add event15 and publish action for event15
        session.add(event15)
        publisher.publish(action=True, uuid=event15.event_id)

        session.commit()

        # Close the publisher.
        publisher.close()
