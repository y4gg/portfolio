"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"

interface Blog {
  id: string;
  title: string;
  content: string;
  published: Date;
  slug: string;
}

interface BlogViewerProps {
  selectedBlogSlug?: string;
  apiKey: string;
  setSelectedBlogSlug: (slug: string | undefined) => void;
  removeBlog: (slug: string) => void;
}

export default function BlogEditor({ selectedBlogSlug, apiKey, setSelectedBlogSlug, removeBlog }: BlogViewerProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleEdit = () => {
    fetch("/api/blogs/blog", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        slug: selectedBlogSlug,
        apiKey
      }),
    }).then((res) => {
      if (!res.ok) {
        toast.error("Error updating blog");
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      toast.success("Blog updated successfully");
    })
  };

  const handleDelete = () => {
    fetch("/api/blogs/blog", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: selectedBlogSlug,
        apiKey
      }),
    }).then((res) => {
      if (!res.ok) {
        toast.error("Error deleting blog");
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      toast.success("Blog deleted successfully");
      setSelectedBlogSlug(undefined);
      removeBlog(selectedBlogSlug!);
    })
  };

  useEffect(() => {
    if (!selectedBlogSlug) {
      setBlog(null);
      return;
    }

    setLoading(true);
    fetch("/api/blogs/blog?slug=" + selectedBlogSlug)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        setBlog(null);
        setLoading(false);
      });
  }, [selectedBlogSlug]);

  useEffect(() => {
    if (blog) {
      setContent(blog.content);
      setTitle(blog.title);
    }
  }, [blog]);

  if (!selectedBlogSlug) {
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
          <div className="text-lg">Loading blog post...</div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-muted-foreground">
          <h3 className="text-lg font-medium mb-2">Blog Not Found</h3>
          <p className="text-sm">The selected blog post could not be loaded</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <Card className="h-full flex flex-col flex-1">
        <CardHeader>
          <CardTitle className="space-y-2">
            <Label className="text-md">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>
              Published on {new Date(blog.published).toLocaleDateString()}
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="prose prose-sm max-w-none flex-1 flex flex-col space-y-2">
            <Label className="text-md">Content</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 h-full resize-none text-neutral-800 dark:text-gray-300"
            />
          </div>
          <Separator orientation="horizontal" className="my-4" />
          <div className="flex flex-row justify-between">
            <Button variant={"default"} onClick={handleEdit}>Save</Button>
            <Button variant={"destructive"} onClick={handleDelete}>Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
