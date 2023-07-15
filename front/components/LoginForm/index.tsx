'use client';
import { FormEvent } from 'react';

import { useAuth } from '@/store/auth';

import Logo from '@/ui/Logo';
import Input from '@/ui/Input';

const LoginForm = (): JSX.Element => {
  const signIn = useAuth((state) => state.signIn);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    signIn(e.target[0].value, e.target[1].value);
  };

  return (
    <form className="w-5/12 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" onSubmit={handleSubmit}>
      <div className="flex justify-center mb-4">
        <Logo />
      </div>
      <Input className="mb-4" placeholder="Логин..." />
      <Input className="mb-4" type="password" placeholder="Пароль..." />
      <button
        type="submit"
        className="text-white w-full bg-green-500 hover:bg-green-600 uppercase rounded-md py-2 px-6"
      >
        войти
      </button>
    </form>
  );
};

export default LoginForm;
