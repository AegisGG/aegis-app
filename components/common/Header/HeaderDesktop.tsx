import type { EthersContextProps } from '@context/EthersContext';
import { Logo, Button, Card } from '@components/ui';
import navLinks from '@data/nav-links';
import Coin from '@assets/icons/coin.svg';

interface HeaderDesktopProps {
  ctx: Partial<EthersContextProps>;
}

export default function HeaderDesktop({ ctx }: HeaderDesktopProps) {
  const { connectWallet, walletData } = ctx;

  const isSignedIn = walletData?.signerAddress.length !== 0 && walletData !== undefined ? true : false;

  const linkItems = navLinks.map(item => (
    <li key={item.name}>
      <a className="" href="">
        {item.name}
      </a>
    </li>
  ));

  const buttonClickHandler = () => {
    connectWallet?.();
  };

  return (
    <nav className="flex items-center justify-between gap-6">
      <Logo />
      <ul className="flex w-full items-center justify-around">
        {linkItems}
        <li>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Coin />
              <h6 className="font-normal">Balance</h6>
            </div>
            <Card
              className="w-24 flex-1 rounded-full py-1 pl-4 before:rounded-full"
              background="before:bg-black-600/70">
              <p className="font-serif">{isSignedIn ? walletData?.signerBalance : '0.00'}</p>
            </Card>
          </div>
        </li>
        <li>
          <Button
            className="w-full bg-gradient-to-b from-primary-800 to-primary-900 after:bg-primary-900 disabled:bg-transparent disabled:bg-none disabled:after:bg-transparent"
            onClick={buttonClickHandler}
            {...{ disabled: isSignedIn }}>
            {isSignedIn ? 'Connected' : 'Connect Wallet'}
          </Button>
        </li>
      </ul>
    </nav>
  );
}
