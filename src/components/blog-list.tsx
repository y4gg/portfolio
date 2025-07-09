import Link from "next/link";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Header } from "@/components/general";
import { Skeleton } from "@/components/ui/skeleton";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: Date;
  slug: string;
}

interface BlogListProps {
  isMobile: boolean;
  onBlogSelect?: (slug: string) => void;
  blogs: Blog[];
  loading: boolean;
}

function getPageNumbers(currentPage: number, totalPages: number) {
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
}

export function BlogList({
  isMobile,
  onBlogSelect,
  blogs,
  loading
}: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(3);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<
    string | undefined
  >();

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
    if (onBlogSelect) onBlogSelect(blogSlug);
  };

  if (loading) {
    return (
      <div className={isMobile ? "p-4" : "p-6 h-full overflow-y-auto"}>
        <Header />
        {[...Array(blogsPerPage)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 animate-pulse mb-4">
            <Skeleton className="h-8 rounded w-2/5 mb-2"></Skeleton>
            <Skeleton className="h-4 rounded w-2/5 mb-2"></Skeleton>
            <Skeleton className="h-18 rounded w-9/10 mb-2"></Skeleton>
            <Skeleton className="h-8 rounded w-4/9"></Skeleton>
          </div>
        ))}
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="p-4">
        <Header />
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
                {getPageNumbers(currentPage, totalPages).map((page) => (
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
    );
  }
  // Desktop
  return (
    <div className="p-6 h-full overflow-y-auto">
      <Header />
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
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {getPageNumbers(currentPage, totalPages).map((page) => (
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
  );
}
