import clsx from 'clsx';
import { Card, Avatar, NumberInput } from '@components/ui';
import useMediaQuery from '@hooks/useMediaQuery';

interface BettingTeamProps {
  className?: string;
}

/* Todo: {data}: BettingEventProp */
export default function BettingTeam({ className }: BettingTeamProps) {
  const isMobile = useMediaQuery('(max-width: 1440px)', false);

  return (
    <div className={clsx(className)}>
      <div className="flex flex-col gap-4 desktop:grid desktop:grid-cols-12 desktop:items-start">
        <div className="flex items-center gap-2 desktop:col-span-3">
          <Avatar />
          {/* Todo: data.team */}
          <p>Team 1</p>
        </div>

        <div className="flex justify-between gap-4 desktop:col-span-2">
          {isMobile && <h6 className="w-[80px]">Result</h6>}
          {/* Todo: data.result */}
          <Card className="flex-1 rounded-full pl-2 before:rounded-full before:bg-black-600/50">0.00</Card>
        </div>

        <div className="flex justify-between gap-4 desktop:col-span-2">
          {isMobile && <h6 className="w-[80px]">Winner</h6>}
          {/* Todo: data.winner */}
          <Card className="flex-1 rounded-full pl-2 before:rounded-full before:bg-black-600/50">0.00</Card>
        </div>

        <div className="flex justify-between gap-4 desktop:col-span-2">
          {isMobile && <h6 className="w-[80px]">Wager</h6>}
          <div className="flex-1">
            {/* Todo: data.wager */}
            <NumberInput />
          </div>
        </div>

        <div className="flex gap-4 desktop:col-span-3">
          {isMobile && <h6 className="w-[80px]">Live</h6>}
          <div className="flex flex-1 gap-2 desktop:grid desktop:grid-cols-4">
            <button className="w-full desktop:col-span-2">
              <Card className="py-1 before:bg-black-600/50 desktop:text-sm">Max</Card>
            </button>
            <button className="row-start-2 w-full bg-gradient-to-b from-primary-800 to-primary-900 desktop:col-span-2">
              <Card className="border-none py-1 desktop:text-sm">Stake</Card>
            </button>
            <button className="row-start-2 w-full desktop:col-span-2">
              <Card className="py-1 before:bg-black-600/50 desktop:text-sm">Enable</Card>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
