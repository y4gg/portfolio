import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeaderProps {
  constomText?: string;
}

export function Header({ constomText }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      {constomText ? (
        <h1 className="text-xl lg:text-3xl font-bold">y4.gg&apos;s {constomText}</h1>
      ): (
        <h1 className="text-xl lg:text-3xl font-bold">y4.gg&apos;s Blog</h1>
      )}
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
