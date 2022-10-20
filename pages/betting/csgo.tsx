import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { Layout } from '@components/common';
import { BettingLayout, BettingEvent } from '@components/betting';

const Csgo: NextPageWithLayout = () => {
  const Title = () => (
    <div className="flex items-center justify-center gap-4 px-6 py-4">
      <h4 className="font-normal">DreamHack Beyond 2022 Cup</h4>
    </div>
  );

  return (
    <>
      <Head>
        <title>CS:GO</title>
        <meta
          name="description"
          content="Electronic Sports Fan token dedicated to the purpose of Cryptocurrency mass adaption and the thriving industry of E-Sports"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BettingEvent title={<Title />} />
    </>
  );
};

Csgo.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <BettingLayout>{page}</BettingLayout>
    </Layout>
  );
};

export default Csgo;
