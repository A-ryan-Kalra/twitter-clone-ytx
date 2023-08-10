import Head from "next/head";

import Image from "next/image";
import Sidebar from "../../components/Sidebar";
export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Twitter</title>
      </Head>
      <main className="bg-black flex max-w-[1536px]   mx-auto min-h-screen">
        <Sidebar />
      </main>
    </div>
  );
}
