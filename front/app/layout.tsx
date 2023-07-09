import { ReactNode } from 'react';

import './globals.css';

interface Props {
  children: ReactNode;
}

export const metadata = {
  title: 'trello clone',
};

const RootLayout = ({ children }: Props): JSX.Element => (
  <html lang="ru">
    <body>{children}</body>
  </html>
);

export default RootLayout;
