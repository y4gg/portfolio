import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const API_KEY = process.env.API_KEY;

export async function GET(request: Request) {
  try {
    const slug = new URL(request.url).searchParams.get('slug');
    if (!slug) {
      return NextResponse.json(
        { error: 'No slug provided' },
        { status: 400 }
      );
    }
    const blog = await prisma.blog.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, slug, apiKey } = await request.json();

    // Check API key
    if (apiKey !== API_KEY) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    // Validate required fields
    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: 'Title, content, and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug }
    });

    if (existingBlog) {
      return NextResponse.json(
        { error: 'Blog post with this slug already exists' },
        { status: 409 }
      );
    }

    // Create new blog post
    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        slug
      }
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}