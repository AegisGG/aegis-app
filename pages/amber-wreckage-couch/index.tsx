import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { useAuthUser } from '@react-query-firebase/auth';
import { AdminLogin, AdminProviders, AdminWrapper } from '@components/admin';
import { auth } from '@helpers/firebaseConfig';

const Admin: NextPageWithLayout = () => {
  const user = useAuthUser(['user'], auth);

  return (
    <>
      {user.data ? (
        <div>Redirecting...</div>
      ) : (
        <div className="h-full w-full">
          <Head>
            <title>Aegis Login</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <AdminLogin />
          </main>
        </div>
      )}
    </>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminProviders>
      <AdminWrapper>{page}</AdminWrapper>
    </AdminProviders>
  );
};

export default Admin;
