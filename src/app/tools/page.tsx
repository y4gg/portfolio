"use client";
import { useState } from "react";
import { Embet } from "@/components/embet";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Header } from "@/components/general";
import { GitHubReposSelect } from "@/components/github-repos";

export default function BlogPage() {
  const [selectedRepoUrl, setSelectedRepoUrl] = useState<string | undefined>(
    ""
  );
  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden mx-auto p-4">
        <Header />
        The toolbox is only available on desktop.
      </div>
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-screen h-screen"
        >
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="p-6">
              <Header constomText="Tools"/>
              <GitHubReposSelect
                setSelectedRepoUrl={setSelectedRepoUrl}
                selectedRepoUrl={selectedRepoUrl}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle className="h-screen" />
          <ResizablePanel defaultSize={60} minSize={60} className="p-0">
            <Embet selectedRepoUrl={selectedRepoUrl} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
