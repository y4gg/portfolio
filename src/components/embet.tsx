"use client";
import { useState, useEffect } from "react";

interface BlogViewerProps {
  selectedRepoUrl?: string;
}

export function Embet({ selectedRepoUrl }: BlogViewerProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedRepoUrl) {
      return;
    }
  }, [selectedRepoUrl]);

  if (!selectedRepoUrl) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-muted-foreground">
          <h3 className="text-lg font-medium mb-2">No Blog Selected</h3>
          <p className="text-sm">
            Select a blog post from the list to view it here
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-lg">Loading website...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex-1">
      <iframe
        src={selectedRepoUrl}
        title="Embedded Repo"
        className="w-full h-full rounded"
        frameBorder={0}
        allowFullScreen
        onLoad={() => setLoading(false)}
      ></iframe>
    </div>
  );
}
