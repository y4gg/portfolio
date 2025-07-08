"use client";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import BlogViewer from "@/components/blog-viewer";
import { BlogList } from "@/components/blog-list";

export default function BlogPage() {
  // BlogList will manage all blog state, pagination, and selection
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | undefined>();

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <BlogList
          onBlogSelect={setSelectedBlogSlug}
          isMobile={true}
        />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <ResizablePanelGroup direction="horizontal" className="w-screen h-screen">
          <ResizablePanel defaultSize={40} minSize={25}>
            <BlogList
              onBlogSelect={setSelectedBlogSlug}
              isMobile={false}
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