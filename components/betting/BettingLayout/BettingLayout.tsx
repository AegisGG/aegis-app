import type { ReactNode } from 'react';
import { useContext, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import EthersContext from '@context/EthersContext';
import { Section, Modal } from '@components/ui';
import BettingLeftCol from '../BettingLeftCol';
import BettingRightCol from '../BettingRightCol';

interface BettingLayoutProps {
  children?: ReactNode;
}

const queryClient = new QueryClient();

export default function BettingLayout({ children }: BettingLayoutProps) {
  const { error, setError } = useContext(EthersContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalCloseHandler = () => {
    setIsModalOpen(false);
    setError?.(null);
  };

  useEffect(() => {
    if (error !== null) {
      setIsModalOpen(true);
    }
  }, [error]);

  return (
    <QueryClientProvider client={queryClient}>
      <Modal open={isModalOpen} onClose={() => onModalCloseHandler()} title={error?.title} message={error?.message} />

      <Section component="main">
        <div className="flex flex-col gap-12 py-10 desktop:grid desktop:grid-cols-8 desktop:py-0">
          <BettingLeftCol className="order-3 col-span-2 flex flex-col gap-12 desktop:order-1" />
          <div className="order-1 col-span-4 desktop:order-2 ">{children}</div>
          <BettingRightCol className="order-2 col-span-2 desktop:order-3" />
        </div>
      </Section>
    </QueryClientProvider>
  );
}
