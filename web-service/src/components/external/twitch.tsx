import { DOMAIN } from '@/config';

export const TwitchLiveEmbed = ({ channel }: { channel: string }) => {
    return (
        <iframe
            className="h-full w-full rounded-t"
            src={`https://player.twitch.tv/?channel=${channel}&parent=${DOMAIN}&autoplay=false`}
        />
    );
};
