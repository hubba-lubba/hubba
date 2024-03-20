import {
    BsTencentQq,
    BsTwitterX,
    BsTwitch,
    BsDiscord,
    BsSpotify,
    BsYoutube } from 'react-icons/bs'

export default function ConnectedApp(props: { platform: string, username?: string }) {
    const { platform, username } = props

    let icon
    switch (platform) {
        case 'X':
            icon = <BsTwitterX size={32} className="mr-4" />
            break
        case 'Twitch':
            icon = <BsTwitch size={32} className="mr-4" />
            break
        case 'Discord':
            icon = <BsDiscord size={32} className="mr-4" />
            break
        case 'Spotify':
            icon = <BsSpotify size={32} className="mr-4" />
            break
        case 'Youtube':
            icon = <BsYoutube size={32} className="mr-4" />
            break
        default:
            icon = <BsTencentQq size={32} className="mr-4" />
    }

    let connect
    if (username)
        connect = <p>{username}</p>
    else
        connect = <p>Connect your {platform} account</p>

    return (
        <div className="flex flex-row border-2 p-3 rounded items-center mb-4">
            {icon}
            {connect}
        </div>
    )
}
