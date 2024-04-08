import { Card, Thumbnail } from '@/components/library';
import { User, Video } from '../types';
import { Pfp } from '@/components/elements';

export const VideoCard = ({ user, video }: { user: User; video: Video }) => {
    return (
        <Card
            url={video.url}
            internal={false}
            media={<Thumbnail src={video.thumbnail} />}
            footer={
                <>
                    <Pfp image={user.profile_image} />
                    <div className="ml-2.5 flex flex-col">
                        {/* <div>{video.title}</div> */}
                        <div className='truncate'>{user.username}</div>
                    </div>
                </>
            }
        />
    );
};
