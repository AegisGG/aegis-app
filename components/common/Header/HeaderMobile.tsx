import { useState } from 'react';
import { Logo, HamburgerMenu, Card } from '@components/ui';
import HeaderDropdown from './HeaderDropdown';
import Coin from '@assets/icons/Coin.svg';

export default function HeaderMobile() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <div className="flex items-center justify-between py-4">
      <Logo />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Coin />
          <h6 className="font-normal">Balance</h6>
        </div>
        <Card className="w-24 flex-1 rounded-full py-1 pl-4 before:rounded-full">
          {/* Todo: Fetch Balance */}
          <p className="font-serif">0.00</p>
        </Card>
      </div>
      <HamburgerMenu
        key="hamburger-menu"
        opened={isHamburgerOpen}
        onClick={() => setIsHamburgerOpen(prevState => !prevState)}
      />
      {isHamburgerOpen && <HeaderDropdown />}
    </div>
  );
}
