import { ReactNode } from 'react';
import Image from 'next/image';

export interface TweetProps {
    children: ReactNode;
    className?: string;
}

export default function Tweet({ children, className, ...props }: TweetProps) {
    let cn =
        className ??
        'rounded bg-cyan-100 py-2 px-4 font-bold shadow-md shadow-slate-500 hover:bg-cyan-200';

    return (
        <div className="flex border-2 border-solid border-slate-300">
            <Image
                src="/images/person.svg"
                alt="Person icon"
                width={72}
                height={72}
            />
            <p className="flex-1 bg-slate-100 p-2 text-left">{children}</p>
        </div>
    );
}
