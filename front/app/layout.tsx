import { ReactNode } from 'react';

import './globals.css';

interface Props {
  children: ReactNode;
}

export const metadata = { title: 'trello clone' };

const RootLayout = ({ children }: Props): JSX.Element => (
  <html lang="ru">
    <body>
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-blue-400 filter blur-3xl opacity-50 -z-50" />
      {children}
    </body>
  </html>
);

export default RootLayout;
