import NextAuth, { Account, Session, User } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import TwitterProvider from 'next-auth/providers/twitter';
import { JWT } from 'next-auth/jwt';
import Client from 'twitter-api-sdk';

async function jwt({ token, account }: { token: JWT; account?: Account }) {
    if (account) {
        token.accessToken = account.access_token;
    }

    return token;
}

async function session({ session, token }: { session: Session; token: JWT }) {
    session.accessToken = token.accessToken;

    // read user's twitter handle if access token is available
    if (!!token.accessToken) {
        const client = new Client(token.accessToken as string);
        const me = await client.users.findMyUser();
        session.me = me;
    }

    return session;
}

const options = {
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
            version: '2.0',
            authorization: {
                params: {
                    url: 'https://twitter.com/i/oauth2/authorize',
                    scope: 'users.read tweet.read tweet.write offline.access',
                },
            },
        }),
    ],
    debug: false,
    callbacks: {
        session,
        jwt,
    },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
    NextAuth(req, res, options);
