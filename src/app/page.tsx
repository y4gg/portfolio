import { Button } from "@/components/ui/button";
import { GitHubRepos } from "@/components/github-repos";
import { Github, Mail, AlignCenter, Wrench } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left side - Links */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 lg:py-0">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold my-1">
            Hello World, I&apos;m y4.gg
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            I make stuff, mostly web apps with Next.js. <br /> Remind me to
            update the style of this page.
          </p>

          <div className="space-y-4">
            <Button asChild variant="default" className="w-full lg:hidden">
              <Link
                href="/blog"
                className="w-full flex items-center justify-center"
              >
                <AlignCenter />
                Blog
              </Link>
            </Button>
            <div className="items-center justify-center gap-2 hidden lg:flex">
              <Button asChild variant="default" className="flex-1 w-full">
                <Link
                  href="/blog"
                  className="w-full flex items-center justify-center"
                >
                  <AlignCenter />
                  Blog
                </Link>
              </Button>
              <Button asChild className="flex-1 w-full">
                <Link
                  href="/tools"
                  className="w-full flex items-center justify-center"
                >
                  <Wrench />
                  Toolbox
                </Link>
              </Button>
            </div>
            <Button asChild variant="secondary" className="w-full">
              <Link href="https://github.com/y4gg">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="mailto:contact@y4.gg">
                <Mail className="w-4 h-4 mr-2" />
                Contact me
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Right side - GitHub Repos */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 lg:py-0">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">My Projects</h2>
          <GitHubRepos />
        </div>
      </div>
    </div>
  );
}
