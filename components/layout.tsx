import Head from 'next/head';
import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Twitter Thread Ripper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={className}>{children}</main>
    </div>
  );
}
