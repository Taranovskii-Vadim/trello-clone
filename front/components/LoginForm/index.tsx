'use client';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useAuth } from '@/store/auth';

import Logo from '@/ui/Logo';
import { EMPTY_AVATAR } from '../constants';

const LoginForm = (): JSX.Element => {
  const { signIn, signUp } = useAuth();
  const [preview, setPreview] = useState('');
  const [avatar, setAvatar] = useState<File>();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');

  useEffect(() => {
    setPreview(avatar ? URL.createObjectURL(avatar) : '');
  }, [avatar]);

  const handleSetAvatar = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.files![0];
    if (!value.type.startsWith('image/')) return;

    setAvatar(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (mode === 'signIn') {
      signIn(e.target[0].value, e.target[1].value);
    } else {
      signUp(e.target[0].value, e.target[1].value, avatar);
    }
  };

  return (
    <form className="w-5/12 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" onSubmit={handleSubmit}>
      <div className="flex justify-center mb-4">
        <Logo />
      </div>
      <input className="mb-4" placeholder="Логин..." />
      <input className="mb-4" type="password" placeholder="Пароль..." />
      {mode === 'signUp' ? (
        <div className="flex items-center space-x-6 mb-4">
          <div className="shrink-0">
            <img
              src={preview || EMPTY_AVATAR}
              alt="default avatar"
              className="h-16 w-16 object-cover rounded-full"
              onClick={() => setAvatar(undefined)}
            />
          </div>
          <input
            type="file"
            onChange={handleSetAvatar}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-green-700 hover:file:bg-violet-100"
          />
        </div>
      ) : null}
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
