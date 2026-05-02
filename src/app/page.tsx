import Link from "next/link";
import SubscribeForm from "@/components/SubscribeForm";
import ContactSection from "@/components/ContactSection";
async function getBlogs() {
  let baseUrl = "";

  if (process.env.NODE_ENV === "development") {
    baseUrl = "http://localhost:3000";
  } else if (process.env.NEXT_PUBLIC_BASE_URL) {
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  } else {
    // fallback safety (important)
    baseUrl = "https://cms-drab-omega.vercel.app";
  }

  const res = await fetch(`${baseUrl}/api/blog`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.data.slice(0, 3);
}

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <>
    <main className="max-w-4xl mx-auto p-4">

     {/* 🔵 BANNER */}
<div className="h-42 w-full rounded-xl overflow-hidden relative">
  <img
    src="/banner.jpeg"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/20"></div>
</div>

{/* 🟢 PROFILE */}
<div className="px-6 relative">
  <div className="absolute -top-16 left-6">
    <div className="w-44 h-44 rounded-full border-4 shadow-lg overflow-hidden"
      style={{
        borderColor: "var(--bg)",
      }}
    >
      <img
        src="/profile.jpeg"
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  
  
  
  
  </div>
       <div className="pt-32 md:pt-32">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }} >Naga Sai Teja Bollimuntha...</h1>
          <p className="text-gray-350">
            Building things || learning daily || chasing growth 
          </p>
        </div>

        {/* ABOUT */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>About</h2>
          <p className="text-gray-350 mt-2">
            I write about tech, fitness, and life. Sharing what I learn along the journey of becoming better every day.
          </p>
        </div>

        {/* recent blogs */}
      
<div className="mt-10">
  <h2 className="text-xl font-semibold mb-4">Latest Blogs</h2>

  <div className="space-y-4">
    {blogs.length > 0 ? (
      blogs.map((blog: any) => (
        <div key={blog._id} className="card p-4 shadow-sm">
          <Link href={`/blog/${blog.slug}`}>
            <h3 className="text-lg font-semibold text-accent hover:underline">
              {blog.title}
            </h3>
          </Link>

          <p className="text-sm text-muted">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>

          <p className="mt-2 text-muted">
            {blog.content.slice(0, 100)}...
          </p>
        </div>
      ))
    ) : (
      /* Ghost placeholder cards — space reserved for future posts */
      [0, 1, 2].map((i) => (
        <div key={i} className="card p-4 shadow-sm" style={{ opacity: 0.45 }}>
          {/* Title placeholder */}
          <div className="h-4 rounded mb-3" style={{
            width: i === 0 ? "60%" : i === 1 ? "75%" : "50%",
            backgroundColor: "var(--border)"
          }} />
          {/* Date placeholder */}
          <div className="h-3 rounded mb-3" style={{
            width: "25%",
            backgroundColor: "var(--border)"
          }} />
          {/* Excerpt placeholder lines */}
          <div className="space-y-2">
            <div className="h-3 rounded" style={{ width: "100%", backgroundColor: "var(--border)" }} />
            <div className="h-3 rounded" style={{ width: "85%", backgroundColor: "var(--border)" }} />
          </div>
        </div>
      ))
    )}
  </div>

  <div className="mt-4">
    <Link href="/blogs" className="text-accent hover:underline">
      View All Blogs →
    </Link>
  </div>
</div>

{/* Subscribe form */}
<div className="mt-12 card p-6 text-center">
  <h2 className="text-xl font-semibold mb-2">
    Subscribe to my blog
  </h2>

  <p className="text-sm text-muted mb-4">
    Get notified when I publish new content
  </p>

  <SubscribeForm />
</div>

       
        

      </div>
    </main>
    <ContactSection />
    </>
  );
}