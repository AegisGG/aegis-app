import { useContext } from 'react';
import EthersContext from '@context/EthersContext';
import useMediaQuery from '@hooks/useMediaQuery';
import HeaderMobile from './HeaderMobile';
import HeaderDesktop from './HeaderDesktop';
import { Section } from '@components/ui';

export default function Header() {
  const ctx = useContext(EthersContext);
  const isDesktop = useMediaQuery('(min-width: 1441px)', false);

  return <Section component="header">{isDesktop ? <HeaderDesktop ctx={ctx} /> : <HeaderMobile ctx={ctx} />}</Section>;
}
