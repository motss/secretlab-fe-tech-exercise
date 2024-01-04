import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Header } from './components/Header/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  authors: [
    {
      name: 'Rong Sen Ng',
      url: 'https://github.com/motss'
    },
  ],
  description: 'Generated by Next.js. Visit https://github.com/motss/secretlab-fe-tech-exercise for more details.',
  title: 'Secretlab Frontend Tech Exercise',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
