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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<
    string | undefined
  >();

  useEffect(() => {
    const api_key = getCookie("api_key");
    if (api_key) {
      setIsAuthenticated(true);
    }
  });
  if (!isAuthenticated) {
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
          <BlogList onBlogSelect={setSelectedBlogSlug} isMobile={true} />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <ResizablePanelGroup
            direction="horizontal"
            className="w-screen h-screen"
          >
            <ResizablePanel defaultSize={40} minSize={25}>
              <BlogList onBlogSelect={setSelectedBlogSlug} isMobile={false} />
            </ResizablePanel>
            <ResizableHandle className="h-screen" />
            <ResizablePanel
              defaultSize={60}
              minSize={60}
              className="p-4 lg:p-6"
            >
              <BlogEditor
                selectedBlogSlug={selectedBlogSlug}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </>
    );
  } 
}
