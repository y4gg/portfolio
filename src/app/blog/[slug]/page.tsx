"use client";
import BlogViewer from "@/components/blog-viewer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 pt-6">
        <h1 className="text-xl sm:text-3xl font-bold">y4.gg&apos;s Blog</h1>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
      <BlogViewer selectedBlogSlug={slug} fullScreen={true} />
    </div>
  );
}
