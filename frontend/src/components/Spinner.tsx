interface SpinnerProps {
  label?: string;
}

export default function Spinner({ label = "Loading" }: SpinnerProps) {
  return (
    <div className="flex w-full items-center justify-center gap-3 py-10 text-amz-muted">
      <span
        className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-amz-border border-t-amz-orange"
        role="status"
        aria-label={label}
      />
      <span className="text-sm">{label}…</span>
    </div>
  );
}
