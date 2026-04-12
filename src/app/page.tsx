import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import Link from "next/link";
import SubscribeForm from "@/components/SubscribeForm";

export default async function Home() {
  await connectDB();

  const blogs = await Blog.find().sort({ createdAt: -1 }).limit(3);

  return (
    <main className="max-w-4xl mx-auto p-4">

      {/* 🔵 BANNER */}
      <div className="h-48 bg-gradient-to-r from-gray-400 to-gray-600 rounded-xl"></div>

      {/* 🟢 PROFILE */}
      <div className="px-6 relative">
        <div className="absolute -top-16 left-6">
          <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center text-xl font-bold">
            N
          </div>
        </div>

        <div className="pt-20">
          <h1 className="text-3xl font-bold">Your Name</h1>
          <p className="text-gray-600">
            Building things, learning daily, chasing growth 🚀
          </p>
        </div>

        {/* 🧾 ABOUT */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">About</h2>
          <p className="text-gray-700 mt-2">
            I write about tech, fitness, and life. Sharing what I learn along the journey of becoming better every day.
          </p>
        </div>

        {/* 📰 BLOGS */}
        <div className="mt-10">
  <h2 className="text-xl font-semibold mb-4">Latest Blogs</h2>

  <div className="space-y-4">
    {blogs.map((blog: any) => (
      <div
        key={blog._id}
        className="border p-4 rounded-lg shadow-sm"
        style={{ backgroundColor: "var(--card)" }}
      >
        <Link href={`/blog/${blog.slug}`}>
          <h3 className="text-lg font-semibold text-blue-600 hover:underline">
            {blog.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-500">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        <p className="mt-2 text-gray-200">
          {blog.content.slice(0, 100)}...
        </p>
      </div>
    ))}
  </div>

  <div className="mt-4">
    <Link href="/blogs" className="text-blue-600 hover:underline">
      View All Blogs →
    </Link>
  </div>
</div>

<div className="mt-12 border p-6 rounded-lg text-center">
  <h2 className="text-xl font-semibold mb-2">
    Subscribe to my blog
  </h2>

  <p className="text-sm text-gray-500 mb-4">
    Get notified when I publish new content 🚀
  </p>

  <SubscribeForm />
</div>

      </div>
    </main>
  );
}