"use client";

import { useState } from "react";

export default function LikeButton({ slug, initialLikes }: any) {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    const res = await fetch("/api/blog/like", {
      method: "POST",
      body: JSON.stringify({ slug }),
    });

    const data = await res.json();

    if (data.success) {
      setLikes(data.likes);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
    >
      ❤️ Like ({likes})
    </button>
  );
}