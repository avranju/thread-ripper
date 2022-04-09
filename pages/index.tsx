import type { NextPage } from 'next';
import Image from 'next/image';
import Layout from '../components/layout';
import SignIn from '../components/sign-in';

const Home: NextPage = () => {
    return (
        <Layout>
            <Image
                src="/images/logo.png"
                alt="Thread Ripper Logo"
                width={600}
                height={600}
            />
            <SignIn />
        </Layout>
    );
};

export default Home;
