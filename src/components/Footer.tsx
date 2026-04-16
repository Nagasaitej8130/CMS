export default function Footer() {
  return (
    <footer className="border-t border-theme mt-16">
      <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-muted">
        © {new Date().getFullYear()} Naga Sai Teja Bollimuntha. All rights reserved.
      </div>
    </footer>
  );
}