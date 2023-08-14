import { SparklesIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";

function Feed() {
  const [post, setPost] = useState([]);
  // console.log(post[0].data());
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPost(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div className="text-white flex-grow  border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div
        className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3
      sticky top-0 z-50 bg-black border-b  border-gray-700 "
      >
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-9 h-9 flex justify-center items-center xl:px-0 ml-auto">
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>
      <Input />
      <div className="pb-72">
        {post.map((post, index) => (
          <Post key={index} index={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
