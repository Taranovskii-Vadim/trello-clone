'use client';
import { useMemo } from 'react';
import { useAuth } from '@/store/auth';

import api from '@/store/api';

import Board from '@/components/Board';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';

// action items
// 5) components refactor

// TODO delete file from uploads when delete note
// TODO hash password before create user in db (bcrypt, argon)
// TODO big todo, we can move auth logic to layout and here we can fetch profile and notes for header and board components

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

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-blue-400 filter blur-3xl opacity-50 -z-50" />
      {isAuth ? (
        <>
          <Header />
          <Board />
        </>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default Home;
