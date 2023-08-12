import {
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function Input() {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const addImageToPost = () => {};
  return (
    <div>
      <div
        className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll`}
      >
        <img
          src="https://chat.openai.com/apple-touch-icon.png"
          className="h-11 w-11 rounded-full cursor-pointer"
          alt=""
        />
        <div className="w-full divide-y divide-gray-700">
          <div className={``}>
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
                  <XMarkIcon className="text-white h-5" />
                </div>
                <img
                  src={selectedFile}
                  className="rounded-2xl max-h-80 object-contain"
                  alt=""
                />
              </div>
            )}
          </div>
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
                  onChange={addImageToPost}
                  ref={filePickerRef}
                />
              </div>
              <div className="icon rotate-90">
                <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>
              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <FaceSmileIcon className="text-[#1d9bf0] h-[22px]" />
              </div>
              <div className="icon">
                <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>
              {showEmojis && (
                <div className="absolute top-44">
                  <Picker
                    data={data}
                    emojiButtonSize={32}
                    onEmojiSelect={console.log}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Input;
