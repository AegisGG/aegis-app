import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthSignInWithEmailAndPassword } from '@react-query-firebase/auth';
import { Modal, Button } from '@components/ui';
import { auth } from '@helpers/firebaseConfig';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';

interface LoginFormInput {
  email: string;
  password: string;
}

export default function AdminLogin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorStatus, setErrorStatus] = useState('');
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginFormInput>();
  const mutation = useAuthSignInWithEmailAndPassword(auth);

  const onSubmit: SubmitHandler<LoginFormInput> = async ({ email, password }) => {
    await setPersistence(auth, browserLocalPersistence);

    mutation.mutate(
      {
        email: email,
        password: password
      },
      {
        onSuccess() {
          router.push('/amber-wreckage-couch/dashboard');
        },
        onError(error) {
          setIsModalOpen(true);
          setErrorStatus(error.message);
        }
      }
    );
  };

  useEffect(() => {
    if (isModalOpen) {
      const modalTimer = setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
      return () => clearTimeout(modalTimer);
    }
  }, [isModalOpen]);

  return (
    <>
      <Modal open={isModalOpen} title="Error" message={errorStatus} onClose={() => setIsModalOpen(false)} />

      <div className="grid h-screen w-screen place-items-center px-6 md:px-10">
        <form className="w-full desktop:w-[380px]" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <div className="mb-6">
              <label className="mb-2 block" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="h-10"
                type="text"
                aria-label="email input"
                aria-required="true"
                required
                {...register('email')}
              />
            </div>
            <div className="mb-8">
              <label className="mb-2 block" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="h-10"
                aria-label="password input"
                aria-required="true"
                required
                {...register('password')}
              />
            </div>
            <Button className="ml-4 w-[calc(100%_-_20px)]" type="submit">
              Login
            </Button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
