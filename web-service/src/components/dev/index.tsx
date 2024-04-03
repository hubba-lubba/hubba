import { useState } from 'react';
import { TbBrandAmongUs } from 'react-icons/tb';
import { logUserDevInfo } from '@/lib/auth';
import {
    createUserData,
    getCurrentUserData,
    getUserData,
} from '@/features/users/api';

const DropdownOption = ({
    children,
    onClick,
}: {
    children: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <div
            className="h-full w-full px-6 py-1 first:pt-4 last:pb-4"
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export const DevDropdown = () => {
    const [text, setText] = useState('');

    return (
        <div className="fixed right-28 top-24 flex w-[200px] flex-col rounded-b bg-hubba-900">
            <DropdownOption onClick={() => logUserDevInfo()}>
                userDevInfo
            </DropdownOption>
            <DropdownOption onClick={() => createUserData({ username: text })}>
                createUserData
            </DropdownOption>
            <DropdownOption onClick={() => getCurrentUserData()}>
                getCurrentUserData
            </DropdownOption>
            <DropdownOption onClick={() => getUserData({ id: text })}>
                getUserData
            </DropdownOption>
            <DropdownOption onClick={() => console.log(text)}>
                verify text
            </DropdownOption>
            <input
                type="text"
                name="text"
                className="rounded-b border-2 border-hubba-800 bg-hubba-900 px-6 py-2 text-white"
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    );
};

export const DevTool = () => {
    const [toggleDevDropdown, setToggleDevDropdown] = useState(false);

    return (
        <div className="pfp cursor-pointer">
            <TbBrandAmongUs
                className="cursor-pointer"
                size={24}
                onClick={() => setToggleDevDropdown(!toggleDevDropdown)}
            />
            {toggleDevDropdown && <DevDropdown />}
        </div>
    );
};
