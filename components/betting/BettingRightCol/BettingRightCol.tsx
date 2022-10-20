import clsx from 'clsx';
import { Card } from '@components/ui';
import guideSteps from '@data/guide-steps';

interface BettingRightColProps {
  className?: string;
}

export default function BettingRightCol({ className }: BettingRightColProps) {
  const guideStepsList = guideSteps.map((item, index) => (
    <ol key={item} className="flex gap-4 not-last:mb-4">
      <h6 className="w-8font-normal">0{index}</h6>
      <p className="flex-1">{item}</p>
    </ol>
  ));

  return (
    <aside className={clsx(className)}>
      <Card withFrame>
        <div>
          <h6 className="px-6 py-4">Guide</h6>
          <hr />
        </div>

        <ul className="px-6 py-4">{guideStepsList}</ul>
      </Card>
    </aside>
  );
}
