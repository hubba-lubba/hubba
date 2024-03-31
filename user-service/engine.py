from sqlalchemy import create_engine
from domains.models.user import User
from domains.models.base import Base
from sqlalchemy.orm import Session
from sqlalchemy_utils import database_exists, create_database
from config import *
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
    publisher = publisher_factory.create_publisher(topic_name='users-mockdata')

    with Session(engine) as session:

        #TODO: Write a script to populate the database with some users
        user1 = User("gamer123", "gamer123@example.com", "profile1.jpg", "Passionate gamer who loves exploring new worlds and completing challenges.", [], 0, [], 0, 1, "https://example.com/channel1", "https://example.com/stream1", ["https://example.com/video1_1", "https://example.com/video1_2"], ["esports_event1", "esports_event2"], ["past_event1"], ["gaming_org1", "gaming_org2"], ["Twitch", "YouTube"], [])

        user2 = User("xXGamerGirlXx", "gamer_girl@example.com", "profile2.jpg", "Streaming my gaming adventures and sharing tips with fellow gamers!", [], 0, [], 0, 0, "https://example.com/channel2", "https://example.com/stream2", ["https://example.com/video2_1", "https://example.com/video2_2"], [], [], [], ["YouTube", "Discord"], [])

        user3 = User("RetroGamer89", "retrogamer89@example.com", "profile3.jpg", "Nostalgic gamer diving into classic titles and reliving childhood memories.", [], 0, [], 0, 1, "https://example.com/channel3", "https://example.com/stream3", ["https://example.com/video3_1", "https://example.com/video3_2"], ["retro_event1", "retro_event2"], ["past_event2"], ["retro_gaming_org1", "retro_gaming_org2"], ["Twitch", "Discord"], [])

        user4 = User("SpeedrunnerPro", "speedrunner@example.com", "profile4.jpg", "Speedrunning enthusiast aiming for world records and mastering glitch exploits.", [], 0, [], 0, 0, "https://example.com/channel4", "https://example.com/stream4", ["https://example.com/video4_1", "https://example.com/video4_2"], [], [], [], ["YouTube", "Twitch"], [])

        user5 = User("CasualGamer123", "casual_gamer@example.com", "profile5.jpg", "Relaxed gamer enjoying casual gaming sessions and exploring indie titles.", [], 0, [], 0, 1, "https://example.com/channel5", "https://example.com/stream5", ["https://example.com/video5_1", "https://example.com/video5_2"], ["indie_event1", "indie_event2"], ["past_event3"], ["indie_gaming_org1", "indie_gaming_org2"], ["YouTube", "Discord"], [])

        user6 = User("PCMasterRace", "pc_gamer@example.com", "profile6.jpg", "PC enthusiast building ultimate gaming rigs and pushing graphics to the limit.", [], 0, [], 0, 0, "https://example.com/channel6", "https://example.com/stream6", ["https://example.com/video6_1", "https://example.com/video6_2"], [], [], [], ["Twitch", "Discord"], [])

        user7 = User("MobileGamerPro", "mobile_gamer@example.com", "profile7.jpg", "Mastering mobile games and dominating leaderboards on the go!", [], 0, [], 0, 1, "https://example.com/channel7", "https://example.com/stream7", ["https://example.com/video7_1", "https://example.com/video7_2"], ["mobile_event1", "mobile_event2"], ["past_event4"], ["mobile_gaming_org1", "mobile_gaming_org2"], ["YouTube", "Discord"], [])

        user8 = User("VRGamerX", "vr_gamer@example.com", "profile8.jpg", "Exploring immersive virtual worlds and experiencing gaming in a whole new dimension.", [], 0, [], 0, 0, "https://example.com/channel8", "https://example.com/stream8", ["https://example.com/video8_1", "https://example.com/video8_2"], [], [], [], ["Twitch", "Discord"], [])

        user9 = User("ConsoleGamingFanatic", "console_gamer@example.com", "profile9.jpg", "Console enthusiast enjoying epic adventures and epic battles on PlayStation, Xbox, and Nintendo platforms.", [], 0, [], 0, 1, "https://example.com/channel9", "https://example.com/stream9", ["https://example.com/video9_1", "https://example.com/video9_2"], ["console_event1", "console_event2"], ["past_event5"], ["console_gaming_org1", "console_gaming_org2"], ["YouTube", "Twitch"], [])

        user10 = User("eSportsPro", "esports_pro@example.com", "profile10.jpg", "Competitive gamer training hard and aiming for victory in esports tournaments.", [], 0, [], 0, 0, "https://example.com/channel10", "https://example.com/stream10", ["https://example.com/video10_1", "https://example.com/video10_2"], [], [], [], ["Twitch", "Discord"], [])

        user11 = User("StrategyGamerMaster", "strategy_gamer@example.com", "profile11.jpg", "Strategizing my way to victory in real-time and turn-based strategy games.", [], 0, [], 0, 1, "https://example.com/channel11", "https://example.com/stream11", ["https://example.com/video11_1", "https://example.com/video11_2"], ["strategy_event1", "strategy_event2"], ["past_event6"], ["strategy_gaming_org1", "strategy_gaming_org2"], ["YouTube", "Discord"], [])

        user12 = User("FightingGameFan", "fighting_gamer@example.com", "profile12.jpg", "Duking it out in fighting games and mastering combos and special moves.", [], 0, [], 0, 0, "https://example.com/channel12", "https://example.com/stream12", ["https://example.com/video12_1", "https://example.com/video12_2"], [], [], [], ["Twitch", "Discord"], [])

        user13 = User("MMORPGPlayer", "mmorpg_gamer@example.com", "profile13.jpg", "Embarking on epic quests and forging alliances in massive online worlds.", [], 0, [], 0, 1, "https://example.com/channel13", "https://example.com/stream13", ["https://example.com/video13_1", "https://example.com/video13_2"], ["mmorpg_event1", "mmorpg_event2"], ["past_event7"], ["mmorpg_gaming_org1", "mmorpg_gaming_org2"], ["YouTube", "Discord"], [])

        user14 = User("PuzzleGameEnthusiast", "puzzle_gamer@example.com", "profile14.jpg", "Solving mind-bending puzzles and unraveling mysteries in puzzle games.", [], 0, [], 0, 0, "https://example.com/channel14", "https://example.com/stream14", ["https://example.com/video14_1", "https://example.com/video14_2"], [], [], [], ["Twitch", "Discord"], [])

        user15 = User("SimulatorGamingFan", "simulator_gamer@example.com", "profile15.jpg", "Simulating life, vehicles, and civilizations in simulator games and sandbox worlds.", [], 0, [], 0, 1, "https://example.com/channel15", "https://example.com/stream15", ["https://example.com/video15_1", "https://example.com/video15_2"], ["simulator_event1", "simulator_event2"], ["past_event8"], ["simulator_gaming_org1", "simulator_gaming_org2"], ["YouTube", "Discord"], [])

        session.add(user1)
        publisher.publish(action=True, uuid=user1.user_id)

        session.add(user2)
        publisher.publish(action=True, uuid=user2.user_id)

        session.add(user3)
        publisher.publish(action=True, uuid=user3.user_id)

        session.add(user4)
        publisher.publish(action=True, uuid=user4.user_id)

        session.add(user5)
        publisher.publish(action=True, uuid=user5.user_id)

        session.add(user6)
        publisher.publish(action=True, uuid=user6.user_id)

        session.add(user7)
        publisher.publish(action=True, uuid=user7.user_id)

        session.add(user8)
        publisher.publish(action=True, uuid=user8.user_id)

        session.add(user9)
        publisher.publish(action=True, uuid=user9.user_id)

        session.add(user10)
        publisher.publish(action=True, uuid=user10.user_id)

        session.add(user11)
        publisher.publish(action=True, uuid=user11.user_id)

        session.add(user12)
        publisher.publish(action=True, uuid=user12.user_id)

        session.add(user13)
        publisher.publish(action=True, uuid=user13.user_id)

        session.add(user14)
        publisher.publish(action=True, uuid=user14.user_id)

        session.add(user15)
        publisher.publish(action=True, uuid=user15.user_id)

        session.commit()

        # Close the publisher.
        publisher.close()
