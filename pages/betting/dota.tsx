import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';

import { GameData } from 'types';
import { useContext } from 'react';
import EthersContext from '@context/EthersContext';
import { dotaDbRef } from '@helpers/firebaseConfig';
import { useDatabaseValue } from '@react-query-firebase/database';

import Head from 'next/head';
import { Layout } from '@components/common';
import { BettingLayout, BettingMiddleCol } from '@components/betting';

const Dota: NextPageWithLayout = () => {
  const { isLoading: walletIsLoading } = useContext(EthersContext);
  const { data, isLoading } = useDatabaseValue<GameData>(['products', 'dota'], dotaDbRef);

  return (
    <>
      <Head>
        <title>Dota</title>
        <meta
          name="description"
          content="Electronic Sports Fan token dedicated to the purpose of Cryptocurrency mass adaption and the thriving industry of E-Sports"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {walletIsLoading || isLoading ? <div>Loading...</div> : <BettingMiddleCol data={data!} />}
    </>
  );
};

Dota.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <BettingLayout>{page}</BettingLayout>
    </Layout>
  );
};

export default Dota;
