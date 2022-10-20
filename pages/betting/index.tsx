import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { Layout } from '@components/common';
import { BettingLayout, BettingEvent } from '@components/betting';

const Betting: NextPageWithLayout = () => {
  const Title = () => (
    <div className="flex items-center justify-center gap-4 px-6 py-4">
      <picture>
        <source srcSet="/assets/images/dota.png" type="image/png" />
        <img src="/assets/images/dota.png" alt="Landscape picture" />
      </picture>
      <h4 className="font-normal">The International 2022: Singapore</h4>
    </div>
  );

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

      <BettingEvent title={<Title />} />
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
