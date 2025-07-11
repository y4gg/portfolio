"use client";

interface BlogViewerProps {
  selectedRepoUrl?: string;
}

export function Embet({ selectedRepoUrl }: BlogViewerProps) {

  if (!selectedRepoUrl) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-muted-foreground">
          <h3 className="text-lg font-medium mb-2">No Tool Selected</h3>
          <p className="text-sm">
            Select a tool from the list to open it here
          </p>
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
      ></iframe>
    </div>
  );
}
