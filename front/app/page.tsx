'use client';
import { useMemo } from 'react';
import { useAuth } from '@/store/auth';

import api from '@/store/api';

import Board from '@/components/Board';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';

const Home = (): JSX.Element => {
  const { isAuth, logout } = useAuth();

  useMemo(() => {
    api.interceptors.response.use(
      (r) => r,
      (error) => {
        const { status } = error.response;

        if (status === 401) {
          logout();
        }

        return error;
      },
    );
  }, [logout]);

  if (!isAuth) {
    return <LoginForm />;
  }

  return (
    <>
      <Header />
      <Board />
    </>
  );
};

export default Home;
