import type { ReactElement } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { useState } from 'react';
import { createContext } from 'react';
import { useAuthSignInWithEmailAndPassword } from '@react-query-firebase/auth';
import { auth } from '@helpers/firebaseConfig';

interface AuthProviderProps {
  children: ReactElement;
}

export interface AuthContextProps {
  user: object | null;
  isLoading: boolean;
  login: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: false,
  login: (email: string, password: string) => {}
});

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const loginMutation = useAuthSignInWithEmailAndPassword(auth);

  const login = async (email: string, password: string) => {
    loginMutation.mutate(
      {
        email: email,
        password: password
      },
      {
        onSuccess: data => {
          setUser(data.user);
        },
        onError: error => {
          // console.log('Error', error);
        }
      }
    );
  };

  return (
    <AuthContext.Provider value={{ user, isLoading: loginMutation.isLoading, login }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
