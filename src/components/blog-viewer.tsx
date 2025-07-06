"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: Date;
  slug: string;
}

interface BlogViewerProps {
  selectedBlogSlug?: string;
}

export default function BlogViewer({ selectedBlogSlug }: BlogViewerProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedBlogSlug) {
      setBlog(null);
      return;
    }

    setLoading(true);
    fetch(`/api/blogs/slug/${selectedBlogSlug}`)
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

  if (!selectedBlogSlug) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-muted-foreground">
          <h3 className="text-lg font-medium mb-2">No Blog Selected</h3>
          <p className="text-sm">Select a blog post from the list to view it here</p>
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
    <div className="h-full overflow-y-auto p-6">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{blog.title}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Published on {new Date(blog.published).toLocaleDateString()}</span>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <span>Slug: {blog.slug}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {blog.content}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t">
            <Button variant="outline" asChild>
              <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer">
                View Full Post
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 