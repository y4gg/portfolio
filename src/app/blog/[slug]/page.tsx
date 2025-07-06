"use client";
import BlogViewer from "@/components/blog-viewer";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <div className="flex items-center justify-center h-full"><BlogViewer selectedBlogSlug={slug} fullScreen={true} /></div>;
}
