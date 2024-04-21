import { useState, useContext } from 'react';
import { UserContext } from '@/contexts/UserProvider';
import { logUserDevInfo } from '@/lib/auth';
import { create_user, get_current_user, get_user } from '@/features/users/api';
import { TbBrandAmongUs } from 'react-icons/tb';
import { AuthContext } from '@/contexts/AuthProvider';

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
    const { userData } = useContext(UserContext);
    const user = useContext(AuthContext);

    return (
        <div className="fixed right-28 top-24 flex w-[200px] flex-col rounded-b bg-hubba-900">
            <DropdownOption onClick={() => console.log(userData, user)}>
                userInfo
            </DropdownOption>
            <DropdownOption onClick={() => logUserDevInfo()}>
                userDevInfo
            </DropdownOption>
            <DropdownOption onClick={() => console.log(userData)}>
                userContextData
            </DropdownOption>
            <DropdownOption onClick={() => create_user()}>
                createUser
            </DropdownOption>
            <DropdownOption onClick={() => get_current_user()}>
                getCurrentUser
            </DropdownOption>
            <DropdownOption onClick={() => get_user(text)}>
                getUser
            </DropdownOption>
            <DropdownOption onClick={() => console.log(text)}>
                verify text
            </DropdownOption>
            <input
                type="text"
                name="text"
                placeholder="params"
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
