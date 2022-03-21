import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '../components/button';
import Layout from '../components/layout';
import Title from '../components/title';
import { Tweets } from '../components/tweets';
import { debounce } from 'lodash';
import splitText, { SplitNumberPosition } from '../utils/text-split';
import SubTitle from '../components/sub-title';

const Main: NextPage = () => {
    useEffect(() => {
        const tweetInput = document.querySelector(
            'textarea[name="tweet"]'
        ) as HTMLTextAreaElement;
        tweetInput?.focus();
    });

    let [tweets, setTweets] = useState([] as string[]);

    const onTweetChange = () => {
        const tweetInput = document.querySelector(
            'textarea[name="tweet"]'
        ) as HTMLTextAreaElement;
        if (tweetInput) {
            const text = tweetInput.value.trim();
            if (text.length > 0) {
                setTweets(splitText(text, 250, SplitNumberPosition.Beginning));
            } else {
                setTweets([]);
            }
        }
    };

    return (
        <Layout>
            <div className="mb-1 flex w-full">
                <Image
                    src="/images/logo.png"
                    alt="Thread Ripper Logo"
                    width={100}
                    height={100}
                    className="self-start"
                />
                <Title additionalClassName="self-center">
                    Compose and post tweet
                </Title>
                <br />
            </div>
            <div className="flex w-full flex-col space-y-1">
                <textarea
                    name="tweet"
                    placeholder="Enter tweet content here"
                    className="mb-1 h-96 rounded-sm border-2 border-slate-300 p-2"
                    onChange={debounce(onTweetChange, 500)}
                />
                <input
                    type="text"
                    placeholder="Optional URL of tweet to reply to"
                    className="rounded-sm border-2 border-slate-300 pl-2"
                />
                <Button additionalClassName="self-end w-4/12">Post</Button>

                {tweets.length > 0 && (
                    <SubTitle additionalClassName="self-start pt-8">
                        Tweets Preview
                    </SubTitle>
                )}
                <Tweets tweets={tweets} />
            </div>
        </Layout>
    );
};

export default Main;
