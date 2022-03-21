import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '../components/button';
import Layout from '../components/layout';

const Home: NextPage = () => {
    const router = useRouter();

    const handleSignIn = () => {
        router.push('/main');
    };

    return (
        <Layout>
            <Image
                src="/images/logo.png"
                alt="Thread Ripper Logo"
                width={600}
                height={600}
            />
            <Button onClick={handleSignIn}>
                <div className="flex">
                    <div className="flex-1 pr-2">Sign In</div>
                    <Image
                        src="/images/twitter-logo-blue.png"
                        alt="Twitter Logo"
                        width={25}
                        height={21}
                    />
                </div>
            </Button>
        </Layout>
    );
};

export default Home;
