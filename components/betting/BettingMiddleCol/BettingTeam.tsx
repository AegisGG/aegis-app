import type { ChangeEvent } from 'react';
import { useContext, useState } from 'react';
import clsx from 'clsx';
import EthersContext from '@context/EthersContext';
import { Card, Avatar, NumberInput } from '@components/ui';
import useMediaQuery from '@hooks/useMediaQuery';

interface BettingTeamProps {
  id: string;
  className?: string;
  name?: string;
  image?: string;
  result?: number;
}

/* Todo: {data}: BettingEventProp */
export default function BettingTeam({ id, className, name, image, result }: BettingTeamProps) {
  const [wagerAmount, setWagerAmount] = useState(0);
  const { stakeTeam, enableStaking, teamData, claimPrize } = useContext(EthersContext);
  const isMobile = useMediaQuery('(max-width: 1441px)', false);

  const stakeHandler = () => {
    const poolId = id === 'a' ? 0 : 1;
    stakeTeam?.(poolId, wagerAmount);
  };

  const enableHandler = () => {
    enableStaking?.();
  };

  const claimPrizeHandler = () => {
    claimPrize?.();
  };

  const wagerOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);
    setWagerAmount(amount);
  };

  return (
    <div className={clsx(className)}>
      <div className="mb-8 flex flex-col gap-4 desktop:grid desktop:grid-cols-10 desktop:items-start desktop:gap-6">
        <div className="flex items-center gap-2 desktop:col-span-3">
          <Avatar src={image} />
          <p>{name ? name : 'Team 1'}</p>
        </div>

        <div className="flex justify-between gap-4 desktop:col-span-1">
          {isMobile && <h6 className="w-[80px]">Result</h6>}
          <Card className="flex-1 rounded-full pl-2 before:rounded-full" background="before:bg-black-600/70">
            {result ? result : 0}
          </Card>
        </div>

        <div className="flex justify-between gap-4 desktop:col-span-1">
          {isMobile && <h6 className="w-[80px]">Odds</h6>}
          <Card
            className="flex-1 rounded-full pl-2 before:rounded-full before:bg-black-600/50"
            background="before:bg-black-600/70">
            {teamData ? teamData?.[id].odds : '0'}
          </Card>
        </div>

        <div className="flex justify-between gap-4 desktop:col-span-2">
          {isMobile && <h6 className="w-[80px]">Wager</h6>}
          <div className="flex-1">
            <NumberInput onChange={wagerOnChangeHandler} />
          </div>
        </div>

        <div className="flex gap-4 desktop:col-span-3">
          {isMobile && <h6 className="w-[80px]">Live</h6>}
          <div className="flex flex-1 flex-col gap-2 desktop:grid desktop:grid-cols-4">
            <button className="w-full desktop:col-span-2">
              <Card className="py-1 before:bg-black-600/50 desktop:text-sm" background="before:bg-black-600/70">
                Max
              </Card>
            </button>
            <button className="w-full desktop:col-span-2" onClick={enableHandler}>
              <Card className="py-1 before:bg-black-600/50 desktop:text-sm" background="before:bg-black-600/70">
                Enable
              </Card>
            </button>
            <button
              className="w-full bg-gradient-to-b from-primary-800 to-primary-900 desktop:col-span-2"
              onClick={stakeHandler}>
              <Card className="border-none py-1 desktop:text-sm" background="before:bg-black-600/70">
                Stake
              </Card>
            </button>
            <button className="w-full bg-gradient-to-b from-primary-800 to-primary-900 desktop:col-span-2">
              <Card className="border-none py-1 desktop:text-sm" background="before:bg-black-600/70">
                Unstake
              </Card>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 desktop:justify-end">
        <h6>
          Stake: <span className="ml-2">{teamData?.[id].balance}</span>
        </h6>
        <h6>
          Potential Winning: <span className="ml-2">{teamData?.[id].potentialWinning}</span>
        </h6>
        <button
          className="bg-gradient-to-b from-primary-800 to-primary-900 desktop:col-span-2"
          onClick={claimPrizeHandler}>
          <Card className="border-none py-1 px-4 desktop:text-sm" background="before:bg-black-600/70">
            Claim Prize
          </Card>
        </button>
      </div>
    </div>
  );
}
