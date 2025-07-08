"use client";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import BlogViewer from "@/components/blog-viewer";
import { BlogList } from "@/components/blog-list";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: Date;
  slug: string;
}

export default function BlogPage() {
  // BlogList will manage all blog state, pagination, and selection
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | undefined>();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Remove blog from list
  const removeBlog = (slug: string) => {
    setBlogs(blogs.filter((blog) => blog.slug !== slug));
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <BlogList
          onBlogSelect={setSelectedBlogSlug}
          isMobile={true}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <ResizablePanelGroup direction="horizontal" className="w-screen h-screen">
          <ResizablePanel defaultSize={40} minSize={25}>
            <BlogList
              onBlogSelect={setSelectedBlogSlug}
              isMobile={false}
              blogs={blogs}
              setBlogs={setBlogs}
            />
          </ResizablePanel>
          <ResizableHandle className="h-screen" />
          <ResizablePanel defaultSize={60} minSize={60} className="p-4 lg:p-6">
            <BlogViewer selectedBlogSlug={selectedBlogSlug} fullScreen={false} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}