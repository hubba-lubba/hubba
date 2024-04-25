import { FaRegUserCircle } from 'react-icons/fa';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { MdPlaylistAdd } from 'react-icons/md';
import clsx from 'clsx';
interface PfpProps {
    image?: string;
    variant?: 'user' | 'org' | 'event';
    size?: number;
}

export const Pfp = ({ image, variant = 'user', size = 40 }: PfpProps) => {
    return image ? (
        <img
            src={image}
            alt="image"
            width={size}
            className={clsx(
                `h-[${size}px] object-cover`,
                variant === 'user' ? 'rounded-full' : '',
            )}
        />
    ) : variant === 'org' ? (
        <AiOutlineUsergroupAdd size={size} />
    ) : variant === 'event' ? (
        <MdPlaylistAdd size={size} />
    ) : (
        <FaRegUserCircle size={size} />
    );
};
