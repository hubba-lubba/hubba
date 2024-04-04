export const TwitchLiveEmbed = () => {
    const parent = import.meta.env.DEV ? 'localhost' : 'hubba.eddisonso.com';
    return (
        <iframe
            src={`https://player.twitch.tv/?channel=caseoh_&parent=${parent}&autoplay=false&muted=true`}
            height="200"
            width="300"
        ></iframe>
    );
};
