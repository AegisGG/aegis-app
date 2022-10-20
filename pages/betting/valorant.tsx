import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { Layout } from '@components/common';
import { BettingLayout, BettingEvent } from '@components/betting';

const Valorant: NextPageWithLayout = () => {
  const Title = () => (
    <div className="flex items-center justify-center gap-4 px-6 py-4">
      <h4 className="font-normal">VCT Pacific League</h4>
    </div>
  );

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

      <BettingEvent title={<Title />} />
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
