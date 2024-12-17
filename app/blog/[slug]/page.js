import { get, get as GET } from "@/api/api";
import Link from "next/link";
import SinglePost from "@/components/Blog/SinglePost";
import { headers } from "next/headers";

const getBlogPost = async (slug) => {
  return await GET(`/news/details/${slug}`).then((res) => res?.payload);
};

const BlogPostDetails = async ({ params: { slug } }) => {
  const post = await getBlogPost(slug);
  return (
    <>
      <div className={`text-left w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5`}>
        <div className={`flex items-center gap-2`}>
          <Link className={`text-[0.95rem]`} href={`/`}>
            Početna
          </Link>
          <span className={`text-[0.95rem]`}>/</span>
          <Link className={`text-[0.95rem]`} href={`/blog`}>
            Blog
          </Link>
          <span className={`text-[0.95rem]`}>/</span>
          <span className={`text-[0.95rem]`}>{post?.basic_data?.title}</span>
        </div>
        <h1
          className={`text-[23px] md:text-[29px] font-normal mt-5 w-full border-b pb-2`}
        >
          {post?.basic_data?.title}
        </h1>
      </div>
      <SinglePost post={post} />
    </>
  );
};

export default BlogPostDetails;

const getSEO = (slug) => {
  return get(`/news/details/seo/${slug}`).then((response) => response?.payload);
};

export const generateMetadata = async ({ params: { slug } }) => {
  const data = await getSEO(slug);
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: data?.meta_title ?? "Početna | Fashion Demo",
    description:
      data?.meta_description ?? "Dobrodošli na Fashion Demo Online Shop",
    alternates: {
      canonical: data?.meta_canonical_link ?? canonical,
    },
    robots: {
      index: data?.meta_robots?.index ?? true,
      follow: data?.meta_robots?.follow ?? true,
    },
    openGraph: {
      title: data?.social?.share_title ?? "Početna | Fashion Demo",
      description:
        data?.social?.share_description ??
        "Dobrodošli na Fashion Demo Online Shop",
      type: "website",
      images: [
        {
          url: data?.social?.share_image ?? "",
          width: 800,
          height: 600,
          alt: "Fashion Demo",
        },
      ],
      locale: "sr_RS",
    },
  };
};
