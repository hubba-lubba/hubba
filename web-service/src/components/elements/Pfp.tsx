import { FaRegUserCircle } from 'react-icons/fa';

interface PfpProps {
    image?: string;
    size?: number;
}

export const Pfp = ({ image, size = 40 }: PfpProps) => {
    return image ? (
        <img src={image} alt="image" className="h-6 pr-2.5" />
    ) : (
        <FaRegUserCircle className="pr-2.5" size={size} />
    );
};
