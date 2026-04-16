export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-0 w-full border-t border-theme z-100"
      style={{ backgroundColor: "var(--card)" }}
    >
      <div className="max-w-8xl mx-auto px-6 py-2 text-center text-xs text-muted">
        © {new Date().getFullYear()} Naga Sai Teja Bollimuntha. All rights reserved.
      </div>
    </footer>
  );
}