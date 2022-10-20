import type { ReactElement } from 'react';
import { Card } from '@components/ui';
import BettingTeam from './BettingTeam';
import useMediaQuery from '@hooks/useMediaQuery';

interface BettingMiddleColProps {
  title?: ReactElement;
}

export default function BettingMiddleCol({ title }: BettingMiddleColProps) {
  const isDesktop = useMediaQuery('(min-width: 1440px)', false);

  return (
    <div className="flex flex-col gap-8">
      <Card className="h-36" withFrame>
        <div className="bg:left h-full w-full bg-[url('/assets/images/betting-banner.png')] bg-cover bg-no-repeat lg:bg-center" />
      </Card>

      <Card withFrame>{title}</Card>

      <Card withFrame>
        <div className="px-6 py-6  desktop:grid desktop:grid-cols-12">
          <div className="desktop:col-span-3">
            {/* Todo: {data.type} */}
            <h6 className="mb-2">Type:</h6>
            {/* Todo: {data.time} */}
            <h6>time:</h6>
          </div>
          {isDesktop && <h6 className="self-end desktop:col-span-2">Result</h6>}
          {isDesktop && <h6 className="self-end desktop:col-span-2">Winner</h6>}
          {isDesktop && <h6 className="self-end desktop:col-span-2">Wager</h6>}
          {isDesktop && <h6 className="self-end desktop:col-span-3">Live</h6>}
        </div>
        <hr className="mb-4" />
        <div className="flex flex-col gap-8 py-6 px-6">
          {/* Todo: Pass data={} */}
          <BettingTeam />
          {/* Todo: Pass data={} */}
          <BettingTeam />
        </div>
      </Card>
    </div>
  );
}
