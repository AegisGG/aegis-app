import type { ReactNode } from 'react';
import { EthersContextProvider } from '@context/EthersContext';
import { Header } from '@components/common';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <EthersContextProvider>
      <Header />
      {children}
    </EthersContextProvider>
  );
}
