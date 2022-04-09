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
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Main: NextPage = () => {
    // set focus on the big tweet textarea
    useEffect(() => {
        const tweetInput = document.querySelector(
            'textarea[name="tweet"]'
        ) as HTMLTextAreaElement;
        tweetInput?.focus();
    });

    // handle automatic tweets splitting and preview
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

    // post status state label
    let [postStatus, setPostStatusReal] = useState(<></>);
    let [postLabelCss, setPostLabelCss] = useState(
        'grow self-center text-left text-sky-600'
    );

    const setErrorPostStatus = (status: string) => {
        setPostStatusReal(<span>{status}</span>);
        setPostLabelCss('grow self-center text-left text-amber-500');
    };

    const setPostStatus = (status: string) => {
        setPostStatusReal(<span>{status}</span>);
        setPostLabelCss('grow self-center text-left text-sky-600');
    };

    const setPostStatusHtml = (status: JSX.Element) => {
        setPostStatusReal(status);
        setPostLabelCss('grow self-center text-left text-sky-600');
    };

    // handle display of signed in user name
    const { data: session } = useSession();
    const userName = session?.user?.name ?? '--';

    const onPostTweet = async () => {
        const tweetInput = document.querySelector(
            'textarea[name="tweet"]'
        ) as HTMLTextAreaElement;

        const replyToInput = document.querySelector(
            'input[name="replyTo"]'
        ) as HTMLInputElement;

        if (tweetInput) {
            const content = tweetInput.value.trim();
            const replyTo = replyToInput.value.trim();
            if (content.length > 0) {
                const req = {
                    content,
                    replyTo,
                };

                setPostStatus('Posting tweet(s)...');
                const resp = await fetch('/api/tweet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(req),
                });

                if (resp.ok) {
                    const result = await resp.json();

                    if (result.status === 'success') {
                        const me = session?.me as any;
                        const tweetUrl = `https://twitter.com/${
                            me?.data?.username ?? 'UNKNOWN'
                        }/status/${result.tweetIds[0]}`;
                        const html = (
                            <div>
                                Tweet thread available at:{' '}
                                <a
                                    href={tweetUrl}
                                    target="_blank"
                                    className="underline"
                                >
                                    {tweetUrl}
                                </a>
                            </div>
                        );
                        setPostStatusHtml(html);
                    } else {
                        setErrorPostStatus(result.message);
                    }
                } else {
                    setErrorPostStatus('Error posting tweet(s).');
                }
            }
        }
    };

    // handle sign out
    const router = useRouter();
    const logOut = async () => {
        const data = await signOut({ redirect: false, callbackUrl: '/' });
        router.push(data.url);
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
                <Title additionalClassName="self-center text-left grow">
                    Compose and post tweet
                </Title>
                <div className="grid grid-rows-2 gap-2">
                    <SubTitle additionalClassName="self-end">
                        {userName}
                    </SubTitle>
                    <button
                        onClick={logOut}
                        className="h-7 w-20 place-self-end self-start bg-slate-100 text-blue-600"
                    >
                        Sign Out
                    </button>
                </div>
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
                    name="replyTo"
                    placeholder="Optional URL of tweet to reply to"
                    className="rounded-sm border-2 border-slate-300 pl-2"
                />
                <div className="flex w-full">
                    <div className={postLabelCss}>{postStatus}</div>
                    <Button
                        additionalClassName="self-end w-1/6"
                        onClick={onPostTweet}
                    >
                        Post
                    </Button>
                </div>

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
