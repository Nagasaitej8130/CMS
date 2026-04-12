import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { slug } = await req.json();

    const blog = await Blog.findOneAndUpdate(
      { slug },
      { $inc: { likes: 1 } },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      likes: blog.likes,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}