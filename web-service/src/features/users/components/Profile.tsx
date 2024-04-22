import { Layout } from '@/components/layout';
import { Grid } from '@/components/library';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { VideoCard } from './VideoCard';
import { UserContext } from '@/contexts/UserProvider';
import { useParams } from 'react-router-dom';
import { User, Video } from '../types';
import { Pfp } from '@/components/elements';
import { statuses } from '@/lib/constants';
import { ChannelCard } from './ChannelCard';
import { get_user, get_videos } from '../api';

export const Profile = () => {
    const { id } = useParams<{ id: string }>();
    const [videos, setVideos] = useState<Video[]>([]);
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const { userData, followUser, unfollowUser } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            // if id is specified, gather information about a different user
            if (id) {
                const data = await get_user(id);
                if (data) setUser(data);
                else setError('User not found');
            } else {
                setUser(userData);
            }
            setLoading(false);
        };
        fetchData();
    }, [id, userData]);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            const videosData = await get_videos(user);
            setVideos(videosData);
        };
        fetchData();
    }, [user]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>Error: User not found</div>;

    return (
        <Layout style="flex-col">
            <div className="flex flex-row items-center space-x-8 pb-8">
                <Pfp image={user.profile_image} size={100} />
                <div className="space-y-1">
                    <p className="text-lg font-bold">{user.username}</p>
                    <div className="flex flex-row space-x-2">
                        <p>{`${user.followers.length} ${user.followers.length === 1 ? 'Follower' : 'Followers'}`}</p>
                        <p>
                            {' | '}
                            {statuses[user.streaming_status]}
                        </p>
                    </div>
                    <p>{user.bio}</p>
                    {userData && user.user_id != userData.user_id && (
                        // make this a button component (used in events and orgs as well)
                        <button
                            onClick={() =>
                                userData.following.includes(user.user_id)
                                    ? unfollowUser(user.user_id)
                                    : followUser(user.user_id)
                            }
                            className="w-[150px] rounded-2xl bg-hubba-500 px-3 py-2 font-bold"
                        >
                            {userData.following.includes(user.user_id)
                                ? 'UNFOLLOW'
                                : 'FOLLOW'}
                        </button>
                    )}
                </div>
            </div>
            {user.streaming_status === 1 && (
                <Grid title="live">
                    <ChannelCard user={user} />
                </Grid>
            )}
            <Grid title="videos">
                {videos.map((video, index) => (
                    <VideoCard
                        key={`${video.video_id}-${index}`}
                        user={user}
                        video={video}
                    ></VideoCard>
                ))}
            </Grid>
        </Layout>
    );
};
