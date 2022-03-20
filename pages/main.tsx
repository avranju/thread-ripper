import { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/layout";

const Main: NextPage = () => {
    return (
        <Layout>
            <h1>Main Page</h1>
            <Link href="/">
                <button className="rounded bg-cyan-100 py-2 px-4 font-bold shadow-md shadow-slate-500 hover:bg-cyan-200">Go Back</button>
            </Link>
        </Layout>
    );
}

export default Main;