import type { ReactElement } from 'react';
import { createContext } from 'react';

interface UserProviderProps {
  children: ReactElement;
}

const UserContext = createContext({});

export const UserContextProvider = ({ children }: UserProviderProps) => {
  return <UserContext.Provider value={{ data: 'User' }}>{children}</UserContext.Provider>;
};

export default UserContext;
