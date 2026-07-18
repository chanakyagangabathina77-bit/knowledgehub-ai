import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'

const features = [
  {
    title: 'Smart uploads',
    description: 'Upload PDF, Markdown, and text files with metadata stored securely.',
    icon: '📄',
  },
  {
    title: 'AI answers',
    description: 'Ask natural-language questions and get grounded responses from your docs.',
    icon: '✨',
  },
  {
    title: 'Searchable history',
    description: 'Review past conversations, filter by document, and track your research.',
    icon: '🕘',
  },
]

export default function Home() {
  return (
    <section className="page-shell">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <PageHeader
            eyebrow="AI knowledge workspace"
            title="Turn documents into answers you can trust."
            description="Upload your files, ask questions in plain English, and keep a searchable history of every insight."
          />
          <div className="flex flex-wrap gap-3">
            <Link to="/register" className="btn-primary">
              Create free account
            </Link>
            <Link to="/login" className="btn-secondary">
              Sign in
            </Link>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">Example</p>
            <p className="mt-3 text-sm text-slate-300">Question: What is the leave policy?</p>
            <p className="mt-4 rounded-xl bg-indigo-500/10 p-4 text-sm leading-7 text-indigo-100">
              Employees are entitled to 18 annual leave days.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="glass-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-2xl">
              {feature.icon}
            </div>
            <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
