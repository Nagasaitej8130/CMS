"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminClient() {
  const router = useRouter();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("tech");
  const [tags, setTags] = useState("");

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

  const handleCreate = async () => {
    await fetch("/api/blog/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        category,
        tags: tags.split(",").map((t) => t.trim()),
        coverImage: "",
      }),
    });

    setTitle("");
    setContent("");
    setTags("");
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/blog/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    fetchBlogs();
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/admin/login");
  };

  return (
    <main className="max-w-4xl mx-auto p-10 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* CREATE BLOG */}
      <div className="space-y-3 border p-4 rounded">
        <h2 className="text-xl font-semibold">Create Blog</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 h-32"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2"
        >
          <option value="tech">Tech</option>
          <option value="fitness">Fitness</option>
          <option value="life">Life</option>
          <option value="motivation">Motivation</option>
        </select>

        <input
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border p-2"
        />

        <button
          onClick={handleCreate}
          className="bg-black text-white px-4 py-2"
        >
          Create Blog
        </button>
      </div>

      {/* BLOG LIST */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Blogs</h2>

        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border p-4 rounded space-y-2"
          >
            {editingId === blog._id ? (
              <>
                <input
                  value={blog.title}
                  onChange={(e) => {
                    setBlogs((prev) =>
                      prev.map((b) =>
                        b._id === blog._id
                          ? { ...b, title: e.target.value }
                          : b
                      )
                    );
                  }}
                  className="border p-2 w-full"
                />

                <textarea
                  value={blog.content}
                  onChange={(e) => {
                    setBlogs((prev) =>
                      prev.map((b) =>
                        b._id === blog._id
                          ? { ...b, content: e.target.value }
                          : b
                      )
                    );
                  }}
                  className="border p-2 w-full"
                />

                <button
                  onClick={async () => {
                    await fetch("/api/blog/update", {
                      method: "POST",
                      body: JSON.stringify(blog),
                    });

                    setEditingId(null);
                    fetchBlogs();
                  }}
                  className="bg-green-600 text-white px-3 py-1"
                >
                  Save
                </button>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{blog.title}</h3>
                  <p className="text-sm text-gray-500">
                    {blog.category}
                  </p>
                </div>

                <div className="space-x-2">
                  <button
                    onClick={() => setEditingId(blog._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* LOGOUT BUTTON */}
      <div className="mt-10 text-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </main>
  );
}