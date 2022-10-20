import { Section } from '@components/ui';
import BettingLeftCol from '../BettingLeftCol';
import BettingRightCol from '../BettingRightCol';
import type { ReactNode } from 'react';

interface BettingLayoutProps {
  children?: ReactNode;
}

export default function BettingLayout({ children }: BettingLayoutProps) {
  return (
    <Section component="main">
      <div className="flex flex-col gap-12 desktop:grid desktop:grid-cols-8">
        <BettingLeftCol className="col-span-2 flex flex-col gap-12" />
        <div className="col-span-4">{children}</div>
        <BettingRightCol className="col-span-2" />
      </div>
    </Section>
  );
}
