import { ReactNode } from "react";

import Modal from "@/components/Modal";

import "./globals.css";

interface Props {
  children: ReactNode;
}

export const metadata = {
  title: "trello clone",
};

const RootLayout = ({ children }: Props): JSX.Element => (
  <html lang="ru">
    <body>
      {children}
      <Modal />
    </body>
  </html>
);

export default RootLayout;
