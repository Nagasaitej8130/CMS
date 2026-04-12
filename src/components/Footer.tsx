export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </div>
    </footer>
  );
}