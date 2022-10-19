import { Card } from '@components/ui';

export default function BettingEvent() {
  return (
    <div className="flex flex-col gap-8">
      <Card>Banner</Card>

      <Card>
        <div className="flex items-center justify-center gap-4 px-6 py-4">
          <picture>
            <source srcSet="./assets/images/dota.png" type="image/png" />
            <img className="" src="./assets/images/dota.png" alt="Landscape picture" />
          </picture>
          <h4 className="font-normal">The International 2022: Singapore</h4>
        </div>
      </Card>

      <Card>
        <div className="px-6 py-4">
          <h6>Type:</h6>
          <h6>time:</h6>
        </div>

        <div className="px-6 py-4">
          <div className="flex flex-col gap-3">
            <p>Team 1</p>

            <div className="flex justify-between gap-4">
              <h6 className="w-[80px]">Result</h6>
              <Card className="flex-1 rounded-full pl-2 before:rounded-full">0.00</Card>
            </div>

            <div className="flex justify-between gap-4">
              <h6 className="w-[80px]">Winner</h6>
              <Card className="flex-1 rounded-full pl-2 before:rounded-full">0.00</Card>
            </div>

            <div className="flex justify-between gap-4">
              <h6 className="w-[80px]">Wager</h6>
              <div className="flex-1">
                <Card className="rounded-full pl-2 before:rounded-full">0.00</Card>
                <button>
                  <Card>Max</Card>
                </button>
                <button>
                  <Card>Stake</Card>
                </button>
                <button>
                  <Card>Enable</Card>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
