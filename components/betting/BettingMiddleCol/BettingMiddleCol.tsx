import { GameData } from 'types';
import { useContext } from 'react';
import EthersContext from '@context/EthersContext';
import { Card } from '@components/ui';
import BettingTeam from './BettingTeam';
import useMediaQuery from '@hooks/useMediaQuery';

interface BettingMiddleColProps {
  data: GameData;
}

export default function BettingMiddleCol({ data }: BettingMiddleColProps) {
  const { walletData } = useContext(EthersContext);
  const isDesktop = useMediaQuery('(min-width: 1441px)', false);

  const isSignedIn = walletData?.signerAddress.length !== 0 && walletData !== undefined ? true : false;

  return (
    <div className="flex flex-col gap-8">
      <Card className="h-36" withFrame>
        <div className="bg:left h-full w-full bg-[url('/assets/images/betting-banner.png')] bg-cover bg-no-repeat lg:bg-center" />
      </Card>

      <Card className="border-primary-900" withFrame>
        <div className="flex items-center justify-center gap-4 px-6 py-4">
          {data.image && (
            <picture>
              <source type="image/png" {...(data && { srcSet: `${data.image}` })} />
              <img alt="event logo" {...(data && { src: `${data.image}` })} />
            </picture>
          )}
          <h4 className="font-normal">
            <>{data ? data.event : ''}</>
          </h4>
        </div>
      </Card>

      <Card withFrame>
        {isSignedIn ? (
          <>
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
              <BettingTeam id="1" data={data?.['team-1']} />
              <BettingTeam id="2" data={data?.['team-2']} />
            </div>
          </>
        ) : (
          <div className="py-6 text-center">
            <h5>Connect your wallet.</h5>
          </div>
        )}
      </Card>
    </div>
  );
}
