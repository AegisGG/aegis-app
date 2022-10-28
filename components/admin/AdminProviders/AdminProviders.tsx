import type { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider } from '@context/UserContext';

interface AdminProvidersProps {
  children: ReactElement;
}

const queryClient = new QueryClient();

export default function AdminProviders({ children }: AdminProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>{children}</UserContextProvider>
    </QueryClientProvider>
  );
}
