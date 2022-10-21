import type { ReactElement } from 'react';
import { useContext } from 'react';
import EthersContext from '@context/EthersContext';
import { Card } from '@components/ui';
import BettingTeam from './BettingTeam';
import useMediaQuery from '@hooks/useMediaQuery';

interface BettingMiddleColProps {
  title?: ReactElement;
}

export default function BettingMiddleCol({ title }: BettingMiddleColProps) {
  const { teamData } = useContext(EthersContext);
  const isDesktop = useMediaQuery('(min-width: 1441px)', false);

  return (
    <div className="flex flex-col gap-8">
      <Card className="h-36" withFrame>
        <div className="bg:left h-full w-full bg-[url('/assets/images/betting-banner.png')] bg-cover bg-no-repeat lg:bg-center" />
      </Card>

      <Card withFrame>{title}</Card>

      <Card withFrame>
        <div className="relative px-6 py-6 desktop:grid desktop:grid-cols-10 desktop:gap-6">
          <div className="desktop:col-span-3">
            <h6 className="mb-2">Type:</h6>
            <h6>Time:</h6>
          </div>
          {isDesktop && <h6 className="self-end desktop:col-span-1">Result</h6>}
          {isDesktop && <h6 className="self-end desktop:col-span-1">Odds</h6>}
          {isDesktop && <h6 className="self-end desktop:col-span-2">Wager</h6>}
          {isDesktop && <h6 className="absolute top-6 right-12">Live</h6>}
        </div>
        <hr className="mb-4" />
        <div className="flex flex-col gap-8 py-6 px-6">
          <BettingTeam
            id="a"
            image="https://f004.backblazeb2.com/file/website-business/hero.jpg"
            name="Dota Team 1"
            result={0}
          />
          <BettingTeam
            id="b"
            image="https://f004.backblazeb2.com/file/website-business/hero.jpg"
            name="Dota Team 2"
            result={1}
          />
        </div>
      </Card>
    </div>
  );
}
