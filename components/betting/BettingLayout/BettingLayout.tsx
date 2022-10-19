import { Section } from '@components/ui';
import { BettingFeatured, BettingNav, BettingGuide } from '@components/betting';
import type { ReactNode } from 'react';

interface BettingLayoutProps {
  children?: ReactNode;
}

export default function BettingLayout({ children }: BettingLayoutProps) {
  return (
    <Section component="main">
      <div className="flex flex-col gap-12">
        <BettingFeatured />
        <BettingNav />
        <div>{children}</div>
        <BettingGuide />
      </div>
    </Section>
  );
}
