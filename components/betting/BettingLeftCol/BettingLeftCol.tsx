import clsx from 'clsx';
import Link from 'next/link';
import { Card } from '@components/ui';
import DotaIcon from '@assets/icons/dota-icon.svg';
import CsgoIcon from '@assets/icons/csgo-icon.svg';
import ValorantIcon from '@assets/icons/valorant-icon.svg';
import LolIcon from '@assets/icons/lol-icon.svg';

interface BettingLeftColProps {
  className?: string;
}

export default function BettingLeftCol({ className }: BettingLeftColProps) {
  return (
    <aside className={clsx(className)}>
      <Card withFrame>
        <div>
          <h6 className="px-6 py-4">Featured</h6>
          <hr />
        </div>

        <div className="flex items-center gap-4 px-6 py-4">
          <picture>
            <source srcSet="/assets/images/dota.png" type="image/png" />
            <img className="" src="/assets/images/dota.png" alt="Landscape picture" />
          </picture>
          <p>The International 2022: Singapore</p>
        </div>
      </Card>

      <Card>
        <div className="px-6 py-6">
          <ul>
            <li className="not-last:mb-6">
              <Link href="/betting/dota">
                <div className="flex cursor-pointer gap-2">
                  <span className="grid w-12 place-items-center">
                    <DotaIcon />
                  </span>
                  <span className="flex-1">Dota 2</span>
                </div>
              </Link>
            </li>
            <li className="not-last:mb-6">
              <Link href="/betting/csgo">
                <div className="flex cursor-pointer gap-2">
                  <span className="grid w-12 place-items-center">
                    <CsgoIcon />
                  </span>
                  <span className="flex-1">Counter Strike 2</span>
                </div>
              </Link>
            </li>
            <li className="not-last:mb-6">
              <Link href="/betting/valorant">
                <div className="flex cursor-pointer gap-2">
                  <span className="grid w-12 place-items-center">
                    <ValorantIcon />
                  </span>
                  <span className="flex-1">Valorant</span>
                </div>
              </Link>
            </li>
            <li className="not-last:mb-6">
              <Link href="/betting/lol">
                <div className="flex cursor-pointer gap-2">
                  <span className="grid w-12 place-items-center">
                    <LolIcon />
                  </span>
                  <span className="flex-1">League Of Legends</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </Card>
    </aside>
  );
}
