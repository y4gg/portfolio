"use client";
import { AdminAuth } from "@/components/admin-auth";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { BlogList } from "@/components/blog-list";
import BlogEditor from "@/components/blog-editor";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: Date;
  slug: string;
}

export default function AdminPage() {
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<
    string | undefined
  >();
  const [apiKey, setApiKey] = useState<string | undefined>();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Remove blog from list
  const removeBlog = (slug: string) => {
    setBlogs(blogs.filter((blog) => blog.slug !== slug));
  };

  useEffect(() => {
    const api_key = getCookie("api_key") as string;
    setApiKey(api_key);
  });
  if (!apiKey) {
    return (
      <div className="max-w-md mx-auto">
        <AdminAuth />
      </div>
    );
  } else {
    return (
      <>
        {/* Mobile Layout */}
        <div className="lg:hidden">
          <BlogList onBlogSelect={setSelectedBlogSlug} isMobile={true} blogs={blogs} setBlogs={setBlogs} />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <ResizablePanelGroup
            direction="horizontal"
            className="w-screen h-screen"
          >
            <ResizablePanel defaultSize={40} minSize={25}>
              <BlogList onBlogSelect={setSelectedBlogSlug} isMobile={false} blogs={blogs} setBlogs={setBlogs} />
            </ResizablePanel>
            <ResizableHandle className="h-screen" />
            <ResizablePanel
              defaultSize={60}
              minSize={60}
              className="p-4 lg:p-6"
            >
              <BlogEditor
                apiKey={apiKey ?? ""}
                selectedBlogSlug={selectedBlogSlug ?? ""}
                setSelectedBlogSlug={setSelectedBlogSlug}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </>
    );
  }
}
