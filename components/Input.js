import {
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import {
  CalendarIcon,
  XMarkIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
import Picker from "emoji-picker-react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";

function Input() {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    // console.log(e.target.files[0] + " e.target.files[0]");
    reader.onload = (readerEvent) => {
      // console.log(readerEvent.target.result + " readerEvent.target.result");
      setSelectedFile(readerEvent.target.result);
    };
  };
  const addEmoji = (e) => {
    // let sym = e.unified.split(" ");
    // let codeArray = [];
    // sym.forEach((el) => codeArray.push("0x" + el));
    // console.log(codeArray);
    // let emoji = String.fromCodePoint(codeArray);
    // console.log(emoji);
    setInput(input + e.emoji);
  };

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadUrl,
        });
      });
    }
    setLoading(false);
    setInput("");
    setShowEmojis(null);
    setSelectedFile(null);
  };
  const { data: session, status } = useSession();

  return (
    <div>
      <div
        className={`flex border-b border-gray-700 p-3  space-x-3 overflow-y-scroll${
          loading && "opacity-60"
        }`}
      >
        <img
          src={session.user.image}
          className="h-11 w-11 rounded-full cursor-pointer"
          alt=""
        />
        <div className="w-full divide-y divide-gray-700">
          <div
            className={`${selectedFile && "pb-7"} ${input && " space-y-2.5"}`}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows="2"
              placeholder="What's happening?"
              className="  w-full min-h-[50px] bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide"
            />
            {selectedFile && (
              <div className="relative">
                <div
                  className="absolute w-8 h-8  bg-[#15181c] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 hoverAnimation cursor-pointer"
                  onClick={() => setSelectedFile(null)}
                >
                  <XMarkIcon className="absolute text-white h-5" />
                </div>
                <img
                  src={selectedFile}
                  className="rounded-2xl max-h-80 object-contain"
                  alt=""
                />
              </div>
            )}
          </div>
          {!loading && (
            <div className="flex items-center justify-between pt-2.5">
              <div className="  flex items-center">
                <div
                  className="icon"
                  onClick={() => filePickerRef.current.click()}
                >
                  <PhotoIcon className="h-[22px] text-[#1d9bf0]" />
                  <input
                    type="file"
                    hidden
                    onChange={(e) => addImageToPost(e)}
                    ref={filePickerRef}
                  />
                </div>
                <div className="icon rotate-90">
                  <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                </div>
                <div
                  className="icon"
                  onClick={() => setShowEmojis(!showEmojis)}
                >
                  <FaceSmileIcon className="text-[#1d9bf0] h-[22px]" />
                </div>
                <div className="icon">
                  <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                </div>
                {showEmojis && (
                  <div className={`absolute top-44  `}>
                    <Picker
                      onEmojiClick={(e) => addEmoji(e)}
                      // data={data}
                      // emojiButtonSize={32}
                      // onEmojiSelect={(e) => addEmoji(e)}
                    />
                  </div>
                )}
              </div>
              <button
                className="bg-[#1d9bf0] text-white rounded-full hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0]
            disabled:opacity-50 disabled:cursor-default px-4 py-1.5 shadow-md font-bold"
                disabled={!input.trim() && !selectedFile}
                onClick={sendPost}
              >
                Tweet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Input;
