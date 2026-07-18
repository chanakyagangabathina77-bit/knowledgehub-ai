import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { apiClient } from '../api/client'
import PageHeader from '../components/ui/PageHeader'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'

type DashboardData = {
  totalDocuments: number
  totalQuestions: number
  recentUploads: Array<{ _id: string; title: string; createdAt: string; fileType?: string }>
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiClient
      .get('/dashboard')
      .then((response) => setData(response.data.data))
      .catch((err) => {
        const message = axios.isAxiosError(err)
          ? err.response?.data?.message || 'Unable to load dashboard.'
          : 'Unable to load dashboard.'
        setError(message)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="page-shell">
        <LoadingSpinner label="Loading dashboard…" />
      </section>
    )
  }

  if (error || !data) {
    return (
      <section className="page-shell">
        <EmptyState
          icon="⚠️"
          title="Dashboard unavailable"
          description={error || 'Unable to load dashboard data right now.'}
        />
      </section>
    )
  }

  const avgQuestions =
    data.totalDocuments > 0 ? (data.totalQuestions / data.totalDocuments).toFixed(1) : '0'

  return (
    <section className="page-shell">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Track your document library, AI usage, and recent activity at a glance."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Documents uploaded', value: data.totalDocuments, accent: 'from-indigo-500 to-blue-500' },
          { label: 'Questions asked', value: data.totalQuestions, accent: 'from-violet-500 to-fuchsia-500' },
          { label: 'Avg questions / doc', value: avgQuestions, accent: 'from-cyan-500 to-teal-500' },
          { label: 'Recent uploads', value: data.recentUploads.length, accent: 'from-amber-500 to-orange-500' },
        ].map((stat) => (
          <article key={stat.label} className="glass-card p-5">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className={`mt-3 bg-gradient-to-r ${stat.accent} bg-clip-text text-3xl font-bold text-transparent`}>
              {stat.value}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="glass-card p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-white">Recent uploads</h2>
            <Link to="/documents" className="text-sm font-medium text-indigo-300 hover:text-indigo-200">
              View all
            </Link>
          </div>
          {data.recentUploads.length === 0 ? (
            <EmptyState
              title="No uploads yet"
              description="Upload your first PDF, Markdown, or text file to start asking questions."
              icon="📁"
            />
          ) : (
            <ul className="space-y-3">
              {data.recentUploads.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="text-sm text-slate-400">
                      {item.fileType?.toUpperCase() || 'DOC'} • {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Link to="/ai" className="btn-secondary">
                    Ask AI
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white">Quick actions</h2>
          <div className="mt-5 grid gap-3">
            <Link to="/documents" className="btn-primary">
              Upload a document
            </Link>
            <Link to="/ai" className="btn-secondary">
              Ask a question
            </Link>
            <Link to="/history" className="btn-secondary">
              Browse conversation history
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
