import Image from 'next/image';

export interface TweetProps {
    content: string;
    className?: string;
}

export default function Tweet({ content, className, ...props }: TweetProps) {
    return (
        <div className="flex border-2 border-solid border-slate-300 drop-shadow-md">
            <Image
                src="/images/person.svg"
                alt="Person icon"
                width={72}
                height={72}
            />
            <div className="flex flex-1 bg-slate-100 p-2 text-left">
                <p className="flex-1">{content}</p>
                <div className="place-self-end bg-sky-200 p-1 text-sm">
                    {content.length}
                </div>
            </div>
        </div>
    );
}
