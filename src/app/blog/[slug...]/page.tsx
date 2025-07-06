"use client";
import BlogViewer from "@/components/blog-viewer";

interface BlogPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const slugString = Array.isArray(slug) ? slug.join('/') : slug;
  
  return <BlogViewer selectedBlogSlug={slugString} />;
}
