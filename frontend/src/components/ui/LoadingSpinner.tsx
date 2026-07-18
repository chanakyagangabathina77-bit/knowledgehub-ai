export default function LoadingSpinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 text-slate-300">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-400/30 border-t-indigo-400" />
      <p className="text-sm">{label}</p>
    </div>
  )
}
