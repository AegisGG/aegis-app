import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthUser } from '@react-query-firebase/auth';
import { auth } from '@helpers/firebaseConfig';

interface AdminWrapperProps {
  children: ReactElement;
}

export default function AdminWrapper({ children }: AdminWrapperProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const user = useAuthUser(['user'], auth, {
    onSuccess(user) {
      if (user) {
        setIsLoggedIn(true);
      } else if (user === null) {
        setIsLoggedIn(false);
      }
    },
    onError(error) {
      console.error('Failed to subscribe to users authentication state!');
    }
  });

  useEffect(() => {
    if (!user.isLoading && router.pathname !== '/amber-wreckage-couch/dashboard' && isLoggedIn) {
      router.push('/amber-wreckage-couch/dashboard');
    }

    if (!user.isLoading && router.pathname !== '/amber-wreckage-couch' && !isLoggedIn) {
      router.push('/amber-wreckage-couch');
    }
  }, [user]);

  if (user.isLoading || isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return children;
}
