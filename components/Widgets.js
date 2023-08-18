import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Trending from "./Trending";
import Image from "next/image";
import { useEffect, useState } from "react";

function Widgets({ trendingResults, followResults }) {
  //   console.log(followResults);

  return (
    <div className="hidden lg:inline ml-8 min-w-[340px]  xl:w-[850px] py-1 space-y-5  ">
      <div className="sticky top-0 py-1.5  bg-black z-50  xl:w-9/12">
        <div className="flex items-center focus:right-2 ring-blue-500 bg-[#202327] p-3 rounded-full relative">
          <MagnifyingGlassIcon className="z-50 h-5 text-gray-500" />
          <input
            type="text"
            className="absolute text-[#d9d9d9] inset-0 w-full rounded-full   focus:ring-2 focus:ring-transparent focus:ring-offset-1
            focus:bg-black focus:shadow-lg  focus:ring-offset-blue-400 outline-none border-none
            bg-transparent pl-10 placeholder-gray-500"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-12/12 xl:w-9/12 ">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        {trendingResults?.map((result, index) => (
          <Trending key={index} result={result} />
        ))}
        <button
          className="hover:bg-white hover:bg-opacity-[0.04] px-4 py-3 cursor-pointer transition duration-200 ease-out flex 
        w-full justify-between text-[#1d9bf0] font-light items-center"
        >
          Show more
        </button>
      </div>

      <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-12/12 xl:w-9/12 ">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {followResults?.map((result, index) => (
          <div
            key={index}
            className="hover:bg-white hover:bg-opacity-[0.04] px-4 py-3
                 cursor-pointer transition duration-200 ease-out items-center flex"
          >
            <Image
              src={result.userImg}
              width={50}
              height={50}
              objectFit="cover"
              className="rounded-full"
            />
            <div className="ml-4 leading-5 group">
              <h4 className="font-bold group-hover:underline">
                {result.username}
              </h4>
              <h5 className="text-gray-500 text-[15px]">{result.tag}</h5>
            </div>
            <button className="text-black rounded-full font-bold bg-white text-sm py-1.5 px-2.5 ml-auto">
              Follow
            </button>
          </div>
        ))}
        <button
          className="hover:bg-white hover:bg-opacity-[0.04] px-4 py-3 cursor-pointer transition
               duration-200 ease-out flex w-full justify-between text-[#1d9bf0] font-light items-center"
        >
          Show more
        </button>
      </div>
    </div>
  );
}

export default Widgets;
