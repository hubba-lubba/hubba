import { DOMAIN } from '@/config';

export const TwitchLiveEmbed = ({channel}: {channel: string}) => {
    return (
        <iframe
            src={`https://player.twitch.tv/?channel=${channel}&parent=${DOMAIN}&autoplay=false`}
            height="200"
            width="300"
        ></iframe>
    );
};
