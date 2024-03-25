import { Card, Grid } from '@/components/layout';
import { VideoLink } from '../types';
import { useEffect, useState } from 'react';
import { getVideoLinks } from '../api';
import { Button } from '@/components/elements/buttons';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import { useParams } from 'react-router-dom';

export const Profile = () => {
    const { id } = useParams<{ id: string }>();
    const [videos, setVideos] = useState<VideoLink[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            // if id is specified, gather information about a different user
            console.log(id);
            const videoLinksData = await getVideoLinks();
            setVideos(videoLinksData.videos);
        };
        fetchData();
    }, []);
    const user = useContext(AuthContext);
    return (
        <div className="p-2">
            <div className="flex flex-row items-center space-x-8 py-8">
                {user?.photoURL ? (
                    <img src={user.photoURL!} alt="pfp" />
                ) : (
                    <img
                        src="/src/assets/images/defaultimg.png"
                        className="h-24 w-24"
                    />
                )}
                <div className="space-y-1">
                    <p className="text-lg font-bold">{user.displayName}</p>
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
                {videos.map((vid, index) => (
                    <Card
                        key={`${vid.id}-${index}`}
                        variant="full"
                        {...vid}
                    ></Card>
                ))}
            </Grid>
        </div>
    );
};
