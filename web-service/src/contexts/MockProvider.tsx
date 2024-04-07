// arrays that hold events and orgs persistent to session
// initialize seed/mock data here.

// user information to load onto webpage: username, profile image, followed streams, events, INBOX

import React, { createContext, useEffect, useState } from 'react';
import { Event } from '@/features/events/types';
import { Org } from '@/features/orgs/types';
import { User } from '@/features/users/types';

interface MockContextType {
    mockEventsData: Event[];
    setMockEventsData: (event: Event[]) => void;
    mockOrgsData: Org[];
    setMockOrgsData: (org: Org[]) => void;
    mockUsersData: User[];
    setMockUsersData: (user: User[]) => void;
}

export const MockContext = createContext<MockContextType>(null!);

export const MockProvider = ({ children }: React.PropsWithChildren<object>) => {
    const [mockEventsData, setMockEventsData] = useState<Event[]>([]);
    const [mockOrgsData, setMockOrgsData] = useState<Org[]>([]);
    const [mockUsersData, setMockUsersData] = useState<User[]>([]);

    useEffect(() => {
        // set mock data here
        
    }, []);

    return (
        <MockContext.Provider
            value={{
                mockEventsData,
                setMockEventsData,
                mockOrgsData,
                setMockOrgsData,
                mockUsersData,
                setMockUsersData,
            }}
        >
            {children}
        </MockContext.Provider>
    );
};
