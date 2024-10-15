
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  name: string;
  password: string;
  
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User) => void;
  signOut: () => void
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser,signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
