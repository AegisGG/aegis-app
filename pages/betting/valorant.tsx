import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { GameData } from 'types';
import { useContext } from 'react';
import EthersContext from '@context/EthersContext';
import { valorantDbRef } from '@helpers/firebaseConfig';
import { useDatabaseValue } from '@react-query-firebase/database';
import Head from 'next/head';
import { Layout } from '@components/common';
import { BettingLayout, BettingMiddleCol } from '@components/betting';

const Valorant: NextPageWithLayout = () => {
  const { isLoading: walletIsLoading } = useContext(EthersContext);
  const { data, isLoading } = useDatabaseValue<GameData>(['products', 'valorant'], valorantDbRef);

  return (
    <>
      <Head>
        <title>Valorant</title>
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

Valorant.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <BettingLayout>{page}</BettingLayout>
    </Layout>
  );
};

export default Valorant;
