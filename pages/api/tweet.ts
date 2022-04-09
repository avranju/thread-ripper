import { NextApiRequest, NextApiResponse } from 'next';
import splitText, { SplitNumberPosition } from '../../utils/text-split';
import { getSession } from 'next-auth/react';
import { Client } from 'twitter-api-sdk';
import { createTweet, TwitterBody } from 'twitter-api-sdk/dist/types';
import parseTweetId from '../../utils/parse-id';

async function postTweet(
    client: Client,
    text: string,
    replyTo?: string
): Promise<[any?, string?]> {
    const req: TwitterBody<createTweet> = {
        text,
    };

    if (!!replyTo) {
        req.reply = {
            in_reply_to_tweet_id: replyTo,
        };
    }

    try {
        const tweet = (await client.tweets.createTweet(req)) as any;
        return [null, tweet.data.id as string];
    } catch (err) {
        return [err, undefined];
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const session = await getSession({ req });
        if (session?.accessToken) {
            // split the tweet into multiple tweets
            const tweets = splitText(
                req.body.content,
                250,
                SplitNumberPosition.Beginning
            );

            const client = new Client(session.accessToken as string);
            let replyTo = parseTweetId(req.body.replyTo);
            let tweetIds = [];
            for (let i = 0; i < tweets.length; ++i) {
                let [err, id]: [any?, string?] = await postTweet(
                    client,
                    tweets[i],
                    replyTo
                );
                if (err) {
                    res.status(200).json({
                        status: 'error',
                        message: err.message,
                    });
                    return;
                } else {
                    replyTo = id;
                    tweetIds.push(id);
                }
            }

            res.status(200).json({
                status: 'success',
                tweetIds,
            });
        } else {
            res.status(200).json({
                status: 'not-signed-in',
                message: 'Sign-in first please.',
            });
        }
    } else {
        res.status(200).json({
            status: 'invalid-method',
            message: 'Try sending a POST request.',
        });
    }
}
