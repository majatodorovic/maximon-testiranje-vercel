import { list as LIST } from "@/api/api";
import Image from "next/image";
import AllPosts from "@/components/Blog/AllPosts";
import Link from "next/link";

const getAllBlogPosts = async () => {
  return await LIST(`/news/category/list/all`).then(
    (res) => res?.payload?.items
  );
};

const Blog = async () => {
  const posts = await getAllBlogPosts();

  return (
    <>
      <div className={`text-left w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5`}>
        <div className={`flex items-center gap-2`}>
          <Link className={`text-[0.95rem]`} href={`/`}>
            Početna
          </Link>
          <span className={`text-[0.95rem]`}>/</span>
          <Link className={`text-[0.95rem]`} href={`/korpa`}>
            Blog
          </Link>
        </div>
        <h1
          className={`text-[23px] md:text-[29px] font-normal mt-5 w-full border-b pb-2`}
        >
          Blog
        </h1>
      </div>

      <AllPosts posts={posts} />
    </>
  );
};

export default Blog;

export const revalidate = 30;

export const metadata = {
  title: "Blog | Fashion Template",
  description: "Fashion Template Blog",
  robots: {
    index: true,
    follow: true,
  },
};
