import type { EthersContextProps } from '@context/EthersContext';
import { useState } from 'react';
import { Logo, HamburgerMenu, Card } from '@components/ui';
import HeaderDropdown from './HeaderDropdown';
import Coin from '@assets/icons/coin.svg';

interface HeaderMobileProps {
  ctx: Partial<EthersContextProps>;
}

export default function HeaderMobile({ ctx }: HeaderMobileProps) {
  const { connectWallet, walletData } = ctx;
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const isSignedIn = walletData?.signerAddress.length !== 0 && walletData !== undefined ? true : false;

  const buttonClickHandler = () => {
    connectWallet?.();
  };

  return (
    <div className="flex items-center justify-between py-4">
      <Logo />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Coin />
          <h6 className="font-normal">Balance</h6>
        </div>
        <Card className="w-24 flex-1 rounded-full py-1 pl-4 before:rounded-full" background="before:bg-black-600/70">
          <p className="font-serif">{isSignedIn ? walletData?.signerBalance : '0.00'}</p>
        </Card>
      </div>
      <HamburgerMenu
        key="hamburger-menu"
        opened={isHamburgerOpen}
        onClick={() => setIsHamburgerOpen(prevState => !prevState)}
      />
      {isHamburgerOpen && <HeaderDropdown isSignedIn={isSignedIn} onButtonClick={buttonClickHandler} />}
    </div>
  );
}
