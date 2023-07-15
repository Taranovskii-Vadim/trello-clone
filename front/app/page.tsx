'use client';
import { useAuth } from '@/store/auth';

import Board from '@/components/Board';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';

// action items
// 5) components refactor

// TODO big todo, we can move auth logic to layout and here we can fetch profile and notes for header and board components

const Home = (): JSX.Element => {
  const isAuth = useAuth((state) => state.isAuth);

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
