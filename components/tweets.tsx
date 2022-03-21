import Tweet from './tweet';

export interface TweetsProps {
    tweets: string[];
}

export function Tweets({ tweets }: TweetsProps) {
    return (
        <div className="flex flex-col">
            {tweets.map((tweet: string, index) => {
                if (index === 0) {
                    return <Tweet content={tweet} />;
                } else {
                    return (
                        <div className="flex flex-col" key={index}>
                            {/* The following is a verticle line connecting this tweet with the
                            previous tweet. */}
                            <div className="m-0 h-4 w-0.5 self-center bg-slate-400 p-0" />
                            <Tweet content={tweet} />
                        </div>
                    );
                }
            })}
        </div>
    );
}
