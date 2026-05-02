export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="max-w-4xl mx-auto px-6 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} Naga Sai Teja Bollimuntha. All rights reserved.
      </div>
    </footer>
  );
}