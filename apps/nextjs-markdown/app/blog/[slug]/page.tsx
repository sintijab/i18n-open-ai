import { Mdx } from "@/components/mdx";
import { allPages } from "contentlayer/generated";

export const generateStaticParams = async () =>
  allPages.map((post) => ({ slug: post._raw.flattenedPath }));

const getPostFromParams = (params) => {
  const slug = params?.slug;
  const post = allPages.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
};

const Page = ({ params }) => {
  const page = getPostFromParams(params);
  return (
    <div>
      <h1>{page?.title}</h1>
      {page && <Mdx code={page?.body?.code} />}
    </div>
  );
};

export default Page;
