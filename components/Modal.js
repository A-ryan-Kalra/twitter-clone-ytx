import React, { useEffect, useState } from "react";
import { modalState, postIdState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";
import { useSession } from "next-auth/react";

function Modal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  const sendComment = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: comment,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });
    setIsOpen(false);
    setComment("");
    document.body.style.overflow = "auto";
    router.push(`/${postId}`);
  };

  // console.log(postId);
  useEffect(
    () =>
      onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );

  return (
    <div
      className="bg-white/20 fixed inset-0 z-50"
      onClick={(e) => {
        setIsOpen(false);
        document.body.style.overflow = "auto";
      }}
    >
      <div
        className="inline-block align-bottom rounded-2xl text-left overflow-hidden transition-all sm:my-8 sm:align-middle min-w-[380px]  sm:max-w-xl sm:w-full bg-black  absolute left-[50%] top-[10%] translate-x-[-50%] "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex items-center px-1.5 py-2 border-b border-gray-700 ">
          <div
            className="hoverAnimation  w-9 h-9 flex items-center justify-center xl:px-0"
            onClick={() => {
              setIsOpen(false);
              document.body.style.overflow = "auto";
            }}
          >
            <XMarkIcon className="h-[22px] text-white" />
          </div>
        </div>
        <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
          <div className="w-full">
            <div className="flex gap-x-3 text-[#6e767d] relative">
              <span className="w-[1px] h-full z-[-1] absolute left-5 top-12 bg-[#CED9DF] bg-opacity-60" />
              <img
                src={post?.userImg}
                className="h-11 w-11  rounded-full"
                alt=""
              />
              <div>
                <div className="inline-block group">
                  <h4 className="font-bold text-[15px] sm:text-base text-[#d9d9d9] inline-block">
                    {post?.username}
                  </h4>
                  <span className="ml-1.5 text-sm sm:text-[15px]">
                    @{post?.tag}
                  </span>
                </div>{" "}
                ·{" "}
                <span className="hover:underline text-sm sm:text-[15px]">
                  <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                </span>
                <p className="text-[#d9d9d9] text-[15px] sm:text-base">
                  {post?.text}
                </p>
              </div>
            </div>
            <div className="mt-14 flex space-x-3 w-full">
              <img
                src={session.user.image}
                className="h-11 w-11 rounded-full"
                alt=""
              />
              <div className="flex-grow mt-2">
                <textarea
                  name=""
                  id=""
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tweet your reply"
                  rows="2"
                  className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]"
                />{" "}
                <div className="flex items-center  justify-between pt-2.5">
                  <div className="flex  items-center">
                    <div className="icon">
                      <PhotoIcon className="text-[#1d9bf0] h-[22px]" />
                    </div>
                    <div className="icon rotate-90">
                      <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                    </div>
                    <div className="icon">
                      <FaceSmileIcon className="text-[#1d9bf0] h-[22px]" />
                    </div>
                    <div className="icon">
                      <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                    </div>
                  </div>
                  <button
                    className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold
                    shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default
                    "
                    type="submit"
                    onClick={sendComment}
                    disabled={!comment.trim()}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
