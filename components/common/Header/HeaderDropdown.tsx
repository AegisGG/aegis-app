import { Button } from '@components/ui';
import navLinks from '@data/nav-links';

interface HeaderDropdownProps {
  isSignedIn: boolean;
  onButtonClick: () => void;
}

export default function HeaderDropdown({ isSignedIn, onButtonClick }: HeaderDropdownProps) {
  const linkItems = navLinks.map(item => (
    <li key={item.name}>
      <a className="text-xl text-black-900" href="">
        {item.name}
      </a>
    </li>
  ));

  return (
    <nav className="clip-menu absolute top-20 z-50 w-[calc(100%_-_48px)] bg-white p-10">
      <ul className="flex flex-col gap-8 ">
        {linkItems}
        <li>
          <Button
            className="w-full bg-gradient-to-b from-primary-800 to-primary-900 text-xl after:bg-primary-900 disabled:bg-transparent disabled:bg-none disabled:text-primary-900 disabled:after:bg-transparent"
            onClick={onButtonClick}
            {...{ disabled: isSignedIn }}>
            {isSignedIn ? 'Connected' : 'Connect Wallet'}
          </Button>
        </li>
      </ul>
    </nav>
  );
}
