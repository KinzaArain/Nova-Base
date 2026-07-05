export default function ProgressBar({ done, total }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 font-mono text-xs text-nova-muted">
        <span>{done}/{total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-nova-border overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-nova-amber to-nova-teal transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
