// user information to load onto webpage: username, profile image, followed streams, events, INBOX

import React, { createContext, useState } from "react";
import { User } from "@/features/users/types";

interface UserContextType {
  userData: User;
  setUserData: (user: User) => void;
}

export const UserContext = createContext<UserContextType>(null!);

export const UserProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [userData, setUserData] = useState<User>(null!);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData
      }}
    >
      {children}
    </UserContext.Provider>
  );
};