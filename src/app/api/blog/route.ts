import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}