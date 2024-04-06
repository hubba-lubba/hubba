from sqlalchemy import create_engine
from domains.models.user import User
from domains.models.events import Events
from domains.models.base import Base
from sqlalchemy.orm import Session
from sqlalchemy_utils import database_exists, create_database
from config import *
from domains.models.events import event_moderator_table
from events.publisher_factory import PublisherFactory

#WARNING!!! DO NOT USE THIS IN PRODUCTION uwu. EVEN HAVING THIS HERE IS VERY BAD PRACTICE FOR OBVIOUS REASONS
RESET_DB = True

engine = create_engine(f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOSTNAME}:{DB_PORT}/{DB_NAME}",
                       echo=True, pool_pre_ping=True)
if not database_exists(engine.url): create_database(engine.url)

if RESET_DB:
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    # Create a publisher factory.
    publisher_factory = PublisherFactory()

    # Create a publisher.
    publisher = publisher_factory.create_publisher(topic_name='events-mockdata')

    with Session(engine) as session:

        #TODO: Write a script to populate the database with some users

        event1 = Events(title="Esports Tournament: League of Legends", 
                        thumbnail="https://example.com/league_of_legends_thumbnail.jpg", 
                        description="Compete in our annual League of Legends tournament and prove your skills!", 
                        url="https://example.com/league_of_legends_tournament", 
                        tags=["gaming", "esports", "League of Legends"], 
                        time_of_event="2025-03-31 08:45:00 UTC", 
                        status="upcoming", 
                        platform="Gamer's Arena", 
                        prizes=["Cash Prize", "Exclusive In-Game Items"])

        event2 = Events(title="Online Gaming Marathon", 
                        thumbnail="https://example.com/gaming_marathon_thumbnail.jpg", 
                        description="Join us for a 24-hour gaming marathon where we'll play various online games together!", 
                        url="https://example.com/gaming_marathon", 
                        tags=["gaming", "marathon", "online gaming"], 
                        time_of_event="2025-03-31 08:45:00 UTC", 
                        status="upcoming", 
                        platform="Gaming Society", 
                        prizes=["Streaming Equipment", "Gaming Merchandise"])

        event3 = Events(title="Call of Duty: Warzone Tournament", 
                        thumbnail="https://example.com/call_of_duty_thumbnail.jpg", 
                        description="Test your skills in our Call of Duty: Warzone tournament and compete for glory!", 
                        url="https://example.com/warzone_tournament", 
                        tags=["gaming", "esports", "Call of Duty"], 
                        time_of_event="2025-03-31 08:45:00 UTC", 
                        status="upcoming", 
                        platform="Warzone Warriors", 
                        prizes=["Cash Prize", "Exclusive In-Game Items"])

        event4 = Events(title="Fortnite Battle Royale Event", 
                        thumbnail="https://example.com/fortnite_thumbnail.jpg", 
                        description="Join us for an epic Fortnite Battle Royale event where we'll battle it out for victory royale!", 
                        url="https://example.com/fortnite_event", 
                        tags=["gaming", "Fortnite", "Battle Royale"], 
                        time_of_event="2025-03-31 08:45:00 UTC", 
                        status="upcoming", 
                        platform="Fortnite Fanatics", 
                        prizes=["V-Bucks", "Cosmetic Items"])

        event5 = Events(title="FIFA World Cup: Virtual Edition", 
                        thumbnail="https://example.com/fifa_virtual_thumbnail.jpg", 
                        description="Experience the thrill of the FIFA World Cup in our virtual edition tournament!", 
                        url="https://example.com/fifa_virtual_cup", 
                        tags=["gaming", "esports", "FIFA"], 
                        time_of_event="2025-03-31 08:45:00 UTC", 
                        status="upcoming", 
                        platform="Virtual FIFA Federation", 
                        prizes=["Cash Prize", "Exclusive In-Game Items"])

        event6 = Events(title="Overwatch League Championship", 
                        thumbnail="https://example.com/overwatch_championship_thumbnail.jpg", 
                        description="Witness the best teams compete in the Overwatch League Championship for ultimate glory!", 
                        url="https://example.com/overwatch_championship", 
                        tags=["gaming", "esports", "Overwatch"], 
                        time_of_event="2025-03-31 08:45:00 UTC", 
                        status="upcoming", 
                        platform="Overwatch League", 
                        prizes=["Championship Trophy", "Exclusive Skins"])

        event7 = Events(title="Minecraft Building Competition", 
                        thumbnail="https://example.com/minecraft_building_thumbnail.jpg", 
                        description="Show off your creativity in our Minecraft Building Competition and win amazing prizes!", 
                        url="https://example.com/minecraft_competition", 
                        tags=["gaming", "Minecraft", "Building"], 
                        time_of_event="2025-03-31 08:45:00 UTC", 
                        status="upcoming", 
                        platform="BlockCrafters Community", 
                        prizes=["Gift Cards", "Exclusive Blocks"])

        event8 = Events(title="Super Smash Bros. Ultimate Tournament", 
                        thumbnail="https://example.com/smash_bros_thumbnail.jpg", 
                        description="Compete in our Super Smash Bros. Ultimate tournament and emerge as the champion!", 
                        url="https://example.com/smash_bros_tournament", 
                        tags=["gaming", "Super Smash Bros.", "Fighting"], 
                        time_of_event="2025-03-31 08:45:00 UTC", 
                        status="upcoming", 
                        platform="Smash Masters Association", 
                        prizes=["Cash Prize", "Exclusive Characters"])

        event9 = Events(title="World of Warcraft Raid Night", 
                        thumbnail="https://example.com/wow_raid_thumbnail.jpg", 
                        description="Gather your party and embark on an epic raid night adventure in World of Warcraft!", 
                        url="https://example.com/wow_raid_night", 
                        tags=["gaming", "World of Warcraft", "MMORPG"], 
                        time_of_event="2025-03-31 08:45:00 UTC", 
                        status="upcoming", 
                        platform="Azeroth Raiders Guild", 
                        prizes=["Legendary Loot", "Mounts"])

        event10 = Events(title="Rocket League Championship", 
                        thumbnail="https://example.com/rocket_league_championship_thumbnail.jpg", 
                        description="Compete in our Rocket League Championship and score amazing goals to claim victory!", 
                        url="https://example.com/rocket_league_championship", 
                        tags=["gaming", "Rocket League", "Sports"], 
                        time_of_event="2025-03-31 08:45:00 UTC", 
                        status="upcoming", 
                        platform="Rocket League Federation", 
                        prizes=["Cash Prize", "Exclusive Car Designs"])

        event11 = Events(title="Dota 2 International Tournament", 
                        thumbnail="https://example.com/dota2_international_thumbnail.jpg", 
                        description="Prepare for intense battles in the Dota 2 International Tournament and compete for the Aegis of Champions!", 
                        url="https://example.com/dota2_international", 
                        tags=["gaming", "esports", "Dota 2"], 
                        time_of_event="2025-03-31 08:45:00 UTC", 
                        status="upcoming", 
                        platform="Valve Corporation", 
                        prizes=["Aegis of Champions", "Cash Prize"])

        event12 = Events(title="Apex Legends Battle Royale Event", 
                        thumbnail="https://example.com/apex_legends_thumbnail.jpg", 
                        description="Join us for an adrenaline-fueled Apex Legends Battle Royale event where only the best squad survives!", 
                        url="https://example.com/apex_legends_event", 
                        tags=["gaming", "Apex Legends", "Battle Royale"], 
                        time_of_event="2025-03-31 08:45:00 UTC", 
                        status="upcoming", 
                        platform="Legends Arena", 
                        prizes=["Apex Coins", "Exclusive Skins"])

        event13 = Events(title="Hearthstone Championship", 
                        thumbnail="https://example.com/hearthstone_championship_thumbnail.jpg", 
                        description="Compete in our Hearthstone Championship and showcase your strategic card-playing skills!", 
                        url="https://example.com/hearthstone_championship", 
                        tags=["gaming", "Hearthstone", "Card Game"], 
                        time_of_event="2025-03-31 08:45:00 UTC", 
                        status="upcoming", 
                        platform="Hearthstone Masters League", 
                        prizes=["Championship Trophy", "Card Packs"])

        event14 = Events(title="Pokémon GO Community Day", 
                        thumbnail="https://example.com/pokemon_go_community_day_thumbnail.jpg", 
                        description="Join us for a Pokémon GO Community Day where we'll catch rare Pokémon and complete challenges together!", 
                        url="https://example.com/pokemon_go_community_day", 
                        tags=["gaming", "Pokémon GO", "Mobile"], 
                        time_of_event="2025-03-31 08:45:00 UTC", 
                        status="upcoming", 
                        platform="Pokémon Trainers Club", 
                        prizes=["Exclusive Pokémon Encounters", "Incubators"])

        event15 = Events(title="Virtual Reality Gaming Expo", 
                        thumbnail="https://example.com/vr_gaming_expo_thumbnail.jpg", 
                        description="Experience the future of gaming in our Virtual Reality Gaming Expo with cutting-edge VR technology!", 
                        url="https://example.com/vr_gaming_expo", 
                        tags=["gaming", "Virtual Reality", "Expo"], 
                        time_of_event="2025-03-31 08:45:00 UTC", 
                        status="upcoming", 
                        platform="VR Innovations", 
                        prizes=["VR Headsets", "Game Demos"])
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
