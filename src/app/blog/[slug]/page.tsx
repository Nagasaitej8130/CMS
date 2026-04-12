import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import LikeButton from "@/components/LikeButton";

export default async function BlogPage({ params }: any) {
  await connectDB();

  const { slug } = await params;

  const blog = await Blog.findOne({ slug });

  if (!blog) {
    return <h1 className="p-10 text-xl">Blog not found</h1>;
  }

  return (
    <main className="max-w-3xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-2">
        {blog.title}
      </h1>

      <p className="text-gray-500 mb-6">
        {new Date(blog.createdAt).toLocaleString()}
      </p>

      <div className="text-lg leading-relaxed whitespace-pre-line">
        {blog.content}
      </div>

      <div className="mt-8 text-sm text-blue-500">
        Category: {blog.category}
      </div>
      <LikeButton slug={slug} initialLikes={blog.likes} />
    </main>
  );
}