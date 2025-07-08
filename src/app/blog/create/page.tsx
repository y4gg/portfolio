"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from "next/link";

export default function CreateBlogForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          slug,
          apiKey
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Blog post created successfully!');
        setTitle('');
        setContent('');
        setSlug('');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Failed to create blog post:' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 lg:p-6 h-full">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-xl lg:text-3xl font-bold">y4.gg&apos;s Blog</h1>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
      <Card className='max-w-md mx-auto'>
        <CardHeader>
          <CardTitle>Create New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="my-blog-post"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px]"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Creating...' : 'Create Post'}
            </Button>
          </form>
          {message && (
            <div className={`mt-4 p-3 rounded-md text-sm ${
              message.includes('Error') 
                ? 'bg-destructive/15 text-destructive border border-destructive/20' 
                : 'bg-green-100 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 