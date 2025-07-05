import { Button } from "@/components/ui/button";
import { GitHubRepos } from "@/components/github-repos";
import { Github, ScrollText } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Links */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold my-1">Hello World, I'm y4.gg</h1>
          <p className="text-lg text-muted-foreground mb-8">
            I make stuff, mostly web apps with Next.js. <br /> Remind me to
            update the style of this page.
          </p>

          <div className="space-y-4">
            <Button asChild variant="default" className="w-full">
              <Link href="/blog">
                <ScrollText className="w-4 h-4 mr-2" />
                Blog
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="https://github.com/y4gg">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Right side - GitHub Repos */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">My Projects</h2>
          <GitHubRepos />
        </div>
      </div>
    </div>
  );
}
