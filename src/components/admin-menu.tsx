"use client";
import { getCookie } from "cookies-next";
import { User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AdminMenu() {
  const api_key = getCookie("api_key");
  if (api_key) {
    fetch("/api/auth?value=" + api_key).then((response) => {
      if (response.ok) {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="h-[1.2rem] w-[1.2rem] scale-100" />
                <span className="sr-only">Admin Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`/admin/blogs`}>Manage Blogs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/admin/create"}>Create Blog</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    });
  } else return null;
}
