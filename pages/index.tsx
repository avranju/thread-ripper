import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../components/layout';

const Home: NextPage = () => {
  const router = useRouter();
  
  const handleSignIn = () => {
    router.push("/main");
  };
  
  return (
      <Layout className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Image
          src="/images/logo.png"
          alt="Thread Ripper Logo"
          width={600}
          height={600}
        />
        <button className="rounded bg-cyan-100 py-2 px-4 font-bold shadow-md shadow-slate-500 hover:bg-cyan-200" onClick={handleSignIn}>
          <div className="flex">
            <div className="flex-1 pr-2">Sign In</div>
            <Image
              src="/images/twitter-logo-blue.png"
              alt="Twitter Logo"
              width={25}
              height={21}
            />
          </div>
        </button>
      </Layout>
  );
};

export default Home;
