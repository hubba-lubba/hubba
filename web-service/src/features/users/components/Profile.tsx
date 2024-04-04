import { Layout } from '@/components/layout';
import { Grid } from '@/components/library';
import { useEffect, useState } from 'react';
import { getVideos, getMockUser } from '../api';
import { Button } from '@/components/elements/buttons';
import { useContext } from 'react';
import { VideoCard } from './VideoCard';
import { UserContext } from '@/contexts/UserProvider';
import { useParams } from 'react-router-dom';
import { User } from '../types';
import { FaRegUserCircle } from 'react-icons/fa';
import { Video } from '../types';

export const Profile = () => {
    const { id } = useParams<{ id: string }>();
    const [videos, setVideos] = useState<Video[]>([]);
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            // if id is specified, gather information about a different user
            if (id) {
                const data = (await getMockUser(id)).user;
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
            const videosData = await getVideos(user);
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
                {user.profile_image ? (
                    <img src={user.profile_image!} alt="pfp" width={100} />
                ) : (
                    <FaRegUserCircle size={100} />
                )}
                <div className="space-y-1">
                    <p className="text-lg font-bold">{user.username}</p>
                    <div className="flex flex-row space-x-2">
                        <p>Followers: {20}</p>
                        {/* should be user.followers */}
                        <p>Videos: {videos.length}</p>
                    </div>
                    <p>user bio</p>
                </div>
                {!user && (
                    <Button
                        variant="base"
                        style="h-11 w-1/6 bg-hubba-500 rounded-md justify-center items-center mx-4"
                    >
                        Follow
                    </Button>
                )}
            </div>
            <Grid>
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
