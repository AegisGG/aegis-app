import { Section } from '@components/ui';
import BettingLeftCol from '../BettingLeftCol';
import BettingRightCol from '../BettingRightCol';
import useMediaQuery from '@hooks/useMediaQuery';
import type { ReactNode } from 'react';

interface BettingLayoutProps {
  children?: ReactNode;
}

export default function BettingLayout({ children }: BettingLayoutProps) {
  const isDesktop = useMediaQuery('(min-width: 1441px)', false);

  if (isDesktop) {
  }

  return (
    <Section component="main">
      <div className="flex flex-col gap-12 py-10 desktop:grid desktop:grid-cols-8 desktop:py-0">
        <BettingLeftCol className="order-3 col-span-2 flex flex-col gap-12 desktop:order-1" />
        <div className="order-1 col-span-4 desktop:order-2 ">{children}</div>
        <BettingRightCol className="order-2 col-span-2 desktop:order-3" />
      </div>
    </Section>
  );
}
