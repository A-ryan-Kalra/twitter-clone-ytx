import Head from "next/head";

import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import Feed from "../../components/Feed";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../../components/Login";
import { data } from "autoprefixer";
import Modal from "../../components/Modal";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../../atoms/modalAtom";
import Widgets from "../../components/Widgets";

export default function Home({ trendingResults, followResults, providers }) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  // console.log(status);
  // console.log(session);
  if (!session) return <Login providers={providers} />;
  // console.log(providers);
  return (
    <div className="">
      <Head>
        <title>Twitter</title>
      </Head>
      <main className="bg-black flex max-w-[1536px]   mx-auto min-h-screen">
        <Sidebar />
        <Feed />
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // const session = await getServerSession(context.req, context.res, authOptions);

  const trendingResults = await fetch("https://www.jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://www.jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );

  const providers = await getProviders();

  return {
    props: {
      trendingResults,
      followResults,
      session,
      providers,
    },
  };
}
