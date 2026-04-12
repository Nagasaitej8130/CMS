import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

// ✅ ADD THESE
import Subscriber from "@/models/Subscriber";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { title, content, category, tags, coverImage } = body;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newBlog = await Blog.create({
      title,
      slug,
      content,
      category,
      tags,
      coverImage,
    });

    // ✅ ADD THIS BLOCK (EMAIL SYSTEM)
    try {
      const subscribers = await Subscriber.find();

      for (const sub of subscribers) {
        await sendEmail(
          sub.email,
          `New Blog: ${title}`,
          `Hey! A new blog is live 🚀\n\n${title}\n\nCheck it out now!`
        );
      }
    } catch (mailError) {
      console.error("Email sending failed:", mailError);
    }

    return NextResponse.json({
      success: true,
      data: newBlog,
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