import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { getRedis } from "@/util/redis";
import ReportView from "@/app/components/report-view-wrapper";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allBlogs
    .filter((p) => p.publishedAt)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const blog = allBlogs.find((p) => p.slug === slug);

  if (!blog) {
    notFound();
  }

  let views = 0;
  const redis = getRedis();
  if (redis) {
    try {
      views =
        (await redis.get<number>(["pageviews", "blogs", slug].join(":"))) ?? 0;
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header blog={blog} views={views} />
      

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={blog.body.code} />
      </article>
    </div>
  );
}
