import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  constomText?: string;
}

export function Header({ constomText }: HeaderProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only show header if in PWA fullscreen or standalone mode on mobile
    const isMobile = /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
    setShow(isMobile && (isStandalone || isFullscreen));
  }, []);

  return (
    <div className="flex items-center justify-between mb-6">
      {constomText ? (
        <h1 className="text-xl lg:text-3xl font-bold">
          y4.gg&apos;s {constomText}
        </h1>
      ) : (
        <h1 className="text-xl lg:text-3xl font-bold">y4.gg&apos;s Blog</h1>
      )}
      {!show ? (
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      ) : (
        <Button asChild>
          <Link href="/blog">Blog Home</Link>
        </Button>
      )}
    </div>
  );
}
