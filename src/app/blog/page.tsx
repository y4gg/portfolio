"use client";
import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import BlogViewer from "@/components/blog-viewer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: Date;
  slug: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(3);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<
    string | undefined
  >();

  useEffect(() => {
    // Fetch blogs from API route instead of using Prisma directly
    fetch("/api/blogs")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Ensure we have an array of blogs
        const blogsArray = Array.isArray(data) ? data : [];
        setBlogs(blogsArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setBlogs([]); // Set empty array on error
        setLoading(false);
      });
  }, []);

  // Calculate pagination
  const blogsArray = Array.isArray(blogs) ? blogs : [];
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogsArray.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogsArray.length / blogsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle blog selection
  const handleBlogSelect = (blogSlug: string) => {
    setSelectedBlogSlug(blogSlug);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (loading) {
    return (
      <ResizablePanelGroup direction="horizontal" className="w-screen h-screen">
        <ResizablePanel defaultSize={40}>
          <div className="p-4 md:p-6 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl md:text-3xl font-bold">y4.gg&apos;s Blog</h1>
              <Button asChild>
                <Link href="/">Back to home</Link>
              </Button>
            </div>
            {[...Array(blogsPerPage)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4 animate-pulse mb-4">
                <Skeleton className="h-8 rounded w-2/5 mb-2"></Skeleton>
                <Skeleton className="h-4 rounded w-2/5 mb-2"></Skeleton>
                <Skeleton className="h-18 rounded w-2/3 mb-2"></Skeleton>
                <Skeleton className="h-8 rounded w-4/9"></Skeleton>
              </div>
            ))}
          </div>
        </ResizablePanel>
        <ResizableHandle className="h-screen" />
        <ResizablePanel defaultSize={60} className="hidden md:block">
          <BlogViewer selectedBlogSlug={selectedBlogSlug} fullScreen={false} />
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">y4.gg&apos;s Blog</h1>
            <Button asChild>
              <Link href="/">Back to home</Link>
            </Button>
          </div>

          {currentBlogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No blog posts found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentBlogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <article className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
                    <p className="text-gray-600 mb-3 text-sm">
                      {new Date(blog.published).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 line-clamp-3 text-sm">
                      {blog.content.substring(0, 150)}...
                    </p>
                    <p className="inline-block mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Read more →
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {getPageNumbers().map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <ResizablePanelGroup direction="horizontal" className="w-screen h-screen">
          <ResizablePanel defaultSize={40} minSize={25}>
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">y4.gg&apos;s Blog</h1>
                <Button asChild>
                  <Link href="/">Back to home</Link>
                </Button>
              </div>

              {currentBlogs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No blog posts found.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {currentBlogs.map((blog) => (
                    <article
                      key={blog.id}
                      className={`border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer ${
                        selectedBlogSlug === blog.slug ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => handleBlogSelect(blog.slug)}
                    >
                      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                      <p className="text-gray-600 mb-3">
                        {new Date(blog.published).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700 line-clamp-3">
                        {blog.content.substring(0, 200)}...
                      </p>
                      <p
                        className="inline-block mt-3 text-blue-600 hover:text-blue-800 font-medium"
                        onClick={() => handleBlogSelect(blog.slug)}
                      >
                        Read more →
                      </p>
                    </article>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            handlePageChange(Math.max(1, currentPage - 1))
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {getPageNumbers().map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            handlePageChange(Math.min(totalPages, currentPage + 1))
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </ResizablePanel>
          <ResizableHandle className="h-screen" />
          <ResizablePanel defaultSize={60} minSize={60}>
            <BlogViewer selectedBlogSlug={selectedBlogSlug} fullScreen={false} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}