'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LinkIcon, Star, GitFork } from 'lucide-react';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

export function GitHubRepos() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 4;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/y4gg/repos?sort=recent_update&per_page=100');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        // Filter out the portfolio and y4gg repositories
        const filteredRepos = data.filter((repo: Repository) => repo.name !== 'portfolio' && repo.name !== 'y4gg');
        setRepos(filteredRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(repos.length / reposPerPage);
  const startIndex = (currentPage - 1) * reposPerPage;
  const endIndex = startIndex + reposPerPage;
  const currentRepos = repos.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-2/5 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-4/9"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading repositories: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {currentRepos.map((repo) => (
          <div key={repo.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow pb-1.5">
            {repo.homepage ? (
              <div className="flex items-start justify-between mb-2">
                <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <h3 className="font-semibold text-lg truncate hover:text-primary transition-colors">{repo.name}</h3>
                </Link>
                <Button asChild variant="ghost" size="sm">
                  <Link href={repo.homepage} target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-start justify-between mb-2">
                <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <h3 className="font-semibold text-lg truncate hover:text-primary transition-colors">{repo.name}</h3>
                </Link>
              </div>
            )}
            {repo.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {repo.description}
              </p>
            )}
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-3 h-3" />
                {repo.forks_count}
              </span>
            </div>
            
            {repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {repo.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 bg-secondary text-xs rounded-full"
                  >
                    {topic}
                  </span>
                ))}
                {repo.topics.length > 3 && (
                  <span className="px-2 py-1 bg-secondary text-xs rounded-full">
                    +{repo.topics.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) handlePageChange(currentPage + 1);
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
} 