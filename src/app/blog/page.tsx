"use client";
import { useState, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import BlogViewer from "@/components/blog-viewer";
import { BlogList } from "@/components/blog-list";
import { getCookie } from "cookies-next";

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
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState<string | undefined>();

  useEffect(() => {
    const api_key = getCookie("api_key") as string;
    fetch("/api/auth?value=" + api_key).then((response) => {
      if (response.ok) {
        setApiKey(api_key as string);
      }
    }).catch((error) => {
      console.error("Error validating API key:", error);
    });
    console.log("BlogList useEffect (fetch blogs)");
    fetch("/api/blogs")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const blogsArray = Array.isArray(data) ? data : [];
        setBlogs(blogsArray);
        setLoading(false);
        return;
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
        setLoading(false);
        return;
      });
  }, []);

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <BlogList
          onBlogSelect={setSelectedBlogSlug}
          isMobile={true}
          blogs={blogs}
          setBlogs={setBlogs}
          loading={loading}
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
              loading={loading}
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