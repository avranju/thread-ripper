import Button from './button';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignIn() {
    const router = useRouter();
    const session = useSession();

    if (session.status !== 'authenticated') {
        return (
            <Button onClick={() => signIn('twitter', { callbackUrl: '/main' })}>
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
        );
    } else {
        router.push('/main');
        return <></>;
    }
}
