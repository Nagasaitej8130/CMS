"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");

  const fetchBlogs = async () => {
    const res = await fetch("/api/blog");
    const data = await res.json();

    if (data.success) {
      setBlogs(data.data);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // 🔍 FILTER LOGIC
  const filteredBlogs = blogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((blog) =>
      category === "all" ? true : blog.category === category
    )
    .sort((a, b) =>
      sort === "latest"
        ? new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
    );

  return (
   <main className="max-w-4xl mx-auto p-6 space-y-6">
  <h1 className="text-3xl font-bold">All Blogs</h1>

  <input
    placeholder="Search blogs..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full p-3 rounded-lg text-[var(--text)] input-pro"
  />

  <div className="flex flex-col md:flex-row gap-4">
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="p-2 rounded-lg text-[var(--text)] input-pro"
    >
      <option value="all">All</option>
      <option value="tech">Tech</option>
      <option value="fitness">Fitness</option>
      <option value="life">Life</option>
      <option value="motivation">Motivation</option>
    </select>

    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="p-2 rounded-lg text-[var(--text)] input-pro"
    >
      <option value="latest">Latest</option>
      <option value="oldest">Oldest</option>
    </select>
  </div>

  <div className="space-y-4">
    {filteredBlogs.map((blog) => (
      <div key={blog._id} className="card p-4 shadow-sm">
        <Link href={`/blog/${blog.slug}`}>
          <h2 className="text-xl font-semibold text-accent hover:underline">
            {blog.title}
          </h2>
        </Link>

        <p className="text-sm text-muted">
          {new Date(blog.createdAt).toLocaleString()}
        </p>

        <p className="mt-2 text-muted">
          {blog.content.slice(0, 120)}...
        </p>
      </div>
    ))}
  </div>
</main>
  );
}