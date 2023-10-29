"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const PostCard = ({ post }: any) => {
  const router = useRouter();

  const handleClick = (post: any) => {
    console.log("clicked on post", post);
    router.push(post.url);
  };
  return (
    <div
      className="mb-6 flex flex-wrap cursor-pointer"
      onClick={() => handleClick(post)}
    >
      <div className="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-3/12">
        <div
          className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <Image
            src={post?.multimedia[0]?.url}
            width={80}
            height={80}
            alt="article Image"
            quality={50}
            className="w-full"
          />
          <a href="#!">
            <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]"></div>
          </a>
        </div>
      </div>

      <div className="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-9/12 xl:w-7/12">
        <h5 className="mb-3 text-lg font-bold">{post?.title}</h5>
        <div className="mb-3 flex items-center justify-center text-sm font-medium text-danger dark:text-danger-500 md:justify-start">
          {post.section}
        </div>
        <p className="mb-6 text-neutral-500 dark:text-neutral-300">
          <small>
            Published <u>{post?.published_date}</u>
            <br></br>
            <u>{post?.byline}</u>
          </small>
        </p>
        <p className="text-neutral-900 dark:text-neutral-500">
          {post?.abstract}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
