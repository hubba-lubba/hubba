import { BsTencentQq, BsTwitterX, BsTwitch, BsDiscord, BsSpotify } from 'react-icons/bs'

export default function ConnectedApp(props: { platform: string, connected: boolean }) {
    const { platform, connected } = props

    let icon
    switch (platform) {
        case 'X':
            icon = <BsTwitterX size={32} className="mr-4" />
            break
        case 'twitch':
            icon = <BsTwitch size={32} className="mr-4" />
            break
        case 'discord':
            icon = <BsDiscord size={32} className="mr-4" />
            break
        case 'spotify':
            icon = <BsSpotify size={32} className="mr-4" />
            break
        default:
            icon = <BsTencentQq size={32} className="mr-4" />
    }

    let connect
    if (connected)
        connect = <p>Connected!</p>
    else
        connect = <p>Connect your {platform} account</p>

    return (
        <div className="flex flex-row border-2 p-3 rounded items-center">
            {icon}
            {connect}
        </div>
    )
}
