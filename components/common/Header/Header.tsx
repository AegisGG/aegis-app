import useMediaQuery from '@hooks/useMediaQuery';
import HeaderMobile from './HeaderMobile';
import HeaderDesktop from './HeaderDesktop';
import { Section, HamburgerMenu, Logo } from '@components/ui';

export default function Header() {
  const isDesktop = useMediaQuery('(min-width: 1440px)', false);

  return <Section component="header">{isDesktop ? <HeaderDesktop /> : <HeaderMobile />}</Section>;
}
