import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { id, title, content, category, tags } = await req.json();

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        category,
        tags,
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedBlog,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}