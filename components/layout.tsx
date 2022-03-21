import Head from 'next/head';
import { ReactNode } from 'react';

export interface LayoutProps {
    children: ReactNode;
    className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
    let cn =
        className ??
        'flex w-full flex-1 flex-col items-center justify-center px-20 text-center';

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>Twitter Thread Ripper</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={cn}>{children}</main>
        </div>
    );
}
