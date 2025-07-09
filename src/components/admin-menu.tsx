"use client";
import { getCookie, setCookie } from "cookies-next";
import { Loader2, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function AdminMenu() {
  const [apiKey, setApiKey] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    const api_key = getCookie("api_key");
    if (api_key) {
      fetch("/api/auth?value=" + api_key).then((response) => {
        if (response.ok) {
          setApiKey(api_key as string);
        }
      });
    }
  }, []);

  if (!apiKey) return null;

  const handleLogout = () => {
    setCookie("api_key", "");
    window.location.reload();
  };

  const handleCreate = () => {
    setLoading(true);
    fetch("/api/blogs/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        slug: slug,
        apiKey,
      }),
    }).then((res) => {
      if (!res.ok) {
        toast.error("Error creating blog");
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      toast.success("Blog created successfully");
      setTitle("");
      setContent("");
      setSlug("");
      setLoading(false);
      window.location.reload();
    });
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <User className="h-[1.2rem] w-[1.2rem] scale-100" />
            <span className="sr-only">Admin Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/admin`}>Manage Blogs</Link>
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem>Create Blog</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem>
            <p onClick={handleLogout} className="text-red-500">Logout</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Blog Post</DialogTitle>
          <DialogDescription>
            This is a dialoge where you can create a new blog post.
          </DialogDescription>
        </DialogHeader>
        <Label>Title</Label>
        <Input
          placeholder="New Blog"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label>Content</Label>
        <Textarea
          placeholder="x just happend"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Label>Slug</Label>
        <Input
          placeholder="change-this-in-this-format"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <DialogFooter className="mt-1">
          <Button variant="default" onClick={handleCreate} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create
          </Button>
          <Button variant="outline" className="mr-auto">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
