import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

function Trending({ result }) {
  //   console.log(result);
  return (
    <div className="hover:bg-white hover:bg-opacity-[0.04] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
      <div className="space-y-0.5">
        <p className="text-[#6e767d] text-xs font-medium">{result.heading}</p>
        <h6 className="font-bold text-sm max-w-[250px]">
          {result.description}
        </h6>
        <p className="text-[#6e767d] text-sm font-medium max-w-[250px]">
          Trending with{" "}
          {result.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </p>
      </div>
      {result.img ? (
        <div className="w-[150px]  h-[90px] mx-auto  ">
          <Image
            src={result.img}
            width={90}
            height={90}
            objectFit="cover"
            className="rounded-2xl ml-auto"
          />
        </div>
      ) : (
        <div className="icon group">
          <EllipsisHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
        </div>
      )}
    </div>
  );
}

export default Trending;
