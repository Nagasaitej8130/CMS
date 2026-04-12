"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);

    const res = await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Subscribed successfully!");
      setEmail("");
    } else {
      alert("Already subscribed or error");
    }

    setLoading(false);
  };

  return (
    <div className="flex gap-2 justify-center">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-64"
      />

      <button
        onClick={handleSubscribe}
        className="bg-black text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "..." : "Subscribe"}
      </button>
    </div>
  );
}