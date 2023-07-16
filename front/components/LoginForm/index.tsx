'use client';
import { FormEvent, useState } from 'react';

import { useAuth } from '@/store/auth';

import Logo from '@/ui/Logo';
import Input from '@/ui/Input';

const LoginForm = (): JSX.Element => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (mode === 'signIn') {
      signIn(e.target[0].value, e.target[1].value);
    } else {
      signUp(e.target[0].value, e.target[1].value);
    }
  };

  return (
    <form className="w-5/12 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" onSubmit={handleSubmit}>
      <div className="flex justify-center mb-4">
        <Logo />
      </div>
      <Input className="mb-4" placeholder="Логин..." />
      <Input className="mb-4" type="password" placeholder="Пароль..." />
      {mode === 'signUp' ? <div>place for choose avatar field</div> : null}
      <button
        type="submit"
        className="text-white w-full bg-green-500 hover:bg-green-600 uppercase rounded-md mb-2 py-2 px-6"
      >
        {mode === 'signIn' ? 'войти' : 'зарегистрироваться'}
      </button>
      <p>
        {mode === 'signIn' ? 'Нет аккаунта' : 'Есть аккаунт'}?{' '}
        <a
          className="cursor-pointer text-green-500"
          onClick={() => setMode((prev) => (prev === 'signIn' ? 'signUp' : 'signIn'))}
        >
          {mode === 'signIn' ? 'Зарегистрироваться' : 'Войти'}
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
