import React from "react";

function Post({ id, post, postPage }) {
  return (
    <div className="p-3 flex cursor-pointer borde-b border-[0.5px] border-gray-800">
      {!postPage && (
        <img
          src={post?.userImg}
          alt=""
          className="h-11 w-11 rounded-full mr-4"
        />
      )}
      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            <img
              src={post?.userImg}
              alt=""
              className="h-11 w-11 rounded-full mr-4"
            />
          )}
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className="text-[15px] sm:text-base font-bold text-[#d9d9d9] group-hover:underline ">
                {post?.username}
              </h4>
              <span>@{post?.tag}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
