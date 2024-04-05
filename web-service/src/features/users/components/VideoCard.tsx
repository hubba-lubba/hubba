import { Card, Thumbnail } from '@/components/library';
import { User, Video } from '../types';

export const VideoCard = ({ user, video }: { user: User; video: Video }) => {
    return (
        <Card
            url={video.url}
            internal={false}
            media={<Thumbnail src={video.thumbnail} />}
            footer={
                <>
                    <img src={user.profile_image} />
                    <h2>{user.username}</h2>
                    <h2>{video.title}</h2>
                </>
            }
        />
    );
};
