type EmptyStateProps = {
  title: string
  description: string
  icon?: string
}

export default function EmptyState({ title, description, icon = '📭' }: EmptyStateProps) {
  return (
    <div className="glass-card flex flex-col items-center px-6 py-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/15 text-3xl">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-400">{description}</p>
    </div>
  )
}
