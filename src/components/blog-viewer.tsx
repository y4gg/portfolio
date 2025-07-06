"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: Date;
  slug: string;
}

interface BlogViewerProps {
  selectedBlogSlug?: string;
  fullScreen?: boolean;
}

export default function BlogViewer({
  selectedBlogSlug,
  fullScreen,
}: BlogViewerProps) {
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
    <div className="overflow-y-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{blog.title}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>
              Published on {new Date(blog.published).toLocaleDateString()}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
              {fullScreen ? blog.content : blog.content.substring(0, 1500) + (blog.content.length > 1500 ? '...' : '')}
            </div>
          </div>
          <Separator orientation="horizontal" className="my-4" />
                     {!fullScreen && blog.content.length > 1500 ? (
              <Button variant="outline" asChild>
               <Link href={`/blog/${blog.slug}`}>
                  View Full Post
               </Link>
             </Button>
           ) : (
             <Button variant="outline" asChild>
               <a href={"/blog"}>
                 Back
               </a>
              </Button>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
