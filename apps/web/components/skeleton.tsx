export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={
      `animate-pulse rounded-xl bg-line/40 ${className ?? ''}`.trim()
    }
    />
  );
}
