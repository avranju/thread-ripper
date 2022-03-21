import { NextPage } from 'next';
import Image from 'next/image';
// import Link from 'next/link';
import Button from '../components/button';
import Layout from '../components/layout';
import Title from '../components/title';

const Main: NextPage = () => {
    return (
        <Layout>
            <div className="mb-1 flex w-8/12">
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
            <div className="flex w-8/12 flex-col space-y-1">
                <textarea
                    placeholder="Enter tweet content here"
                    className="h-96 rounded-sm border-2 border-slate-300"
                />
                <input
                    type="text"
                    placeholder="Optional URL to tweet to reply to"
                    className="rounded-sm border-2 border-slate-300"
                />
                <Button additionalClassName="self-end w-4/12">Post</Button>
            </div>

            {/* <Link href="/">
                <Button>Go Back</Button>
            </Link> */}
        </Layout>
    );
};

export default Main;
