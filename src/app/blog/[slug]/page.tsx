"use client";
import BlogViewer from "@/components/blog-viewer";
import { Header } from "@/components/general";
import { useEffect, useState } from "react";

export default function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [blockSlug, setBlockSlug] = useState<string | undefined>();
  params.then(({ slug }) => {
    setBlockSlug(slug);
  });
  return (
    <div className="pt-4 px-4 lg:pt-6 lg:px-6">
      <Header />
      <BlogViewer selectedBlogSlug={blockSlug} fullScreen={true} />
    </div>
  );
}
