import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { Layout } from '@components/common';
import { BettingLayout, BettingEvent } from '@components/betting';

const Betting: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Aegis</title>
        <meta
          name="description"
          content="Electronic Sports Fan token dedicated to the purpose of Cryptocurrency mass adaption and the thriving industry of E-Sports"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BettingEvent />
    </>
  );
};

Betting.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <BettingLayout>{page}</BettingLayout>
    </Layout>
  );
};

export default Betting;
