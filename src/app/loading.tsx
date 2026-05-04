export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg)] z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--muted)', borderTopColor: 'var(--text)' }}></div>
        <p className="font-medium animate-pulse" style={{ color: 'var(--text)', fontFamily: "var(--font-heading)" }}>
          Loading...
        </p>
      </div>
    </div>
  );
}
