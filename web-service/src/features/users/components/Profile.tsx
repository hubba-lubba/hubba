<<<<<<< HEAD
import { Shelf } from '@/components/layout';
import { Card } from '@/components/layout';
import { VideoLink } from '../types';
import { useEffect, useState } from 'react';
import { getVideoLinks } from '../api';
import { Button } from '@/components/elements/buttons';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';

export const Profile = () => {
    const [videos, setVideos] = useState<VideoLink[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const videoLinksData = await getVideoLinks();
            setVideos(videoLinksData.videos);
        }
        fetchData();
    },[]);
    const user = useContext(AuthContext);
    return(
        <div>
            <div className='p-[5%] flex items-center'>
                {user.displayName}
                <Button variant='base' style='h-11 w-1/6 bg-hubba-500 rounded-md justify-center items-center mx-4'>Follow</Button>
            </div>
            <Shelf title='User Videos'>
                {videos.map((vid, index) => (
                    <Card key={`${vid.id}-${index}`} variant='medium' {...vid}></Card>
                ))}
            </Shelf>
        </div>
    );
}
=======
import { useParams } from 'react-router-dom';

export const Profile = () => {
    const { id } = useParams<{ id: string }>();

    return <div>{id ? <h1>User {id}</h1> : <h1>Profile</h1>}</div>;
};
>>>>>>> main
