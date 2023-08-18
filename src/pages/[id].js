import Head from "next/head";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import Login from "../../components/Login";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import Widgets from "../../components/Widgets";

function PostPage({ trendingResults, followResults, providers }) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const [comments, setComment] = useState([]);

  if (!session) return <Login providers={providers} />;
  // console.log(trendingResults);
  // console.log(followResults);
  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComment(snapshot.docs)
      ),
    [db, id]
  );

  return (
    <div className="">
      <Head>
        <title>
          {post?.username} on Twitter: "{post?.text}"
        </title>
      </Head>
      <main className="bg-black flex max-w-[1536px]   mx-auto min-h-screen">
        <Sidebar />
        <div className="flex-grow border-l border-r xl:min-w-[670px] max-w-2xl border-gray-700 sm:ml-[73px] xl:ml-[370px] ">
          <div
            className="flex items-center px-1.5 py-2 border-b border-gray-700 bg-transparent/80 text-[#d9d9d9] font-semibold text-xl
          gap-x-4 top-0 sticky z-50 bg-black"
          >
            <div
              className="hoverAnimation   w-9 h-9 flex items-center justify-between px-2"
              onClick={() => router.push("/")}
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            <div>Post</div>
          </div>
          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div className="pb-72 text-white ">
              {comments.map((comment, index) => (
                <Comment key={index} id={comment.id} comment={comment.data()} />
              ))}
            </div>
          )}
        </div>
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export default PostPage;

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
