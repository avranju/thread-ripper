import NextAuth, { Account, Session, User } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import TwitterProvider from 'next-auth/providers/twitter';
import { JWT } from 'next-auth/jwt';

async function jwt({ token, account }: { token: JWT; account?: Account }) {
    if (account) {
        token.accessToken = account.access_token;
    }

    return token;
}

async function session({
    session,
    token,
    user,
}: {
    session: Session;
    user: User;
    token: JWT;
}) {
    session.accessToken = token.accessToken;
    return session;
}

const options = {
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
            version: '2.0',
        }),
    ],
    debug: false,
    callbacks: {
        jwt,
        session,
    },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
    NextAuth(req, res, options);
