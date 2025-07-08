"use client";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function AdminAuth() {
  const [apiKey, setApiKey] = useState("");
  const handleLogin = () => {
    fetch("/api/auth?value=" + apiKey).then((response) => {
      if (response.ok) {
        setCookie("api_key", apiKey);
        toast("Logged in successfully!");
      } else {
        toast("Invalid API key!");
      }
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Admin Login</CardTitle>
        <CardDescription>
          To create, edit or delete blogs, an API key is required.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label>API Key</Label>
        <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>Login</Button>
      </CardFooter>
    </Card>
  );
}
