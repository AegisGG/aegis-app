import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { useAuthUser } from '@react-query-firebase/auth';
import { AdminProviders, AdminWrapper, AdminDashboard } from '@components/admin';
import { auth } from '@helpers/firebaseConfig';

const Dashboard: NextPageWithLayout = () => {
  const user = useAuthUser(['user'], auth);

  return (
    <>
      {user.data ? (
        <div className="h-full w-full">
          <Head>
            <title>Aegis Login</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <AdminDashboard />
          </main>
        </div>
      ) : (
        <div>Redirecting...</div>
      )}
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminProviders>
      <AdminWrapper>{page}</AdminWrapper>
    </AdminProviders>
  );
};

export default Dashboard;
