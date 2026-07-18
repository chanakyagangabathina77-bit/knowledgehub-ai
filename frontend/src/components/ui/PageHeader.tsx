type PageHeaderProps = {
  eyebrow?: string
  title: string
  description: string
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">{eyebrow}</p>
      ) : null}
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
      <p className="max-w-2xl text-base text-slate-400">{description}</p>
    </div>
  )
}
