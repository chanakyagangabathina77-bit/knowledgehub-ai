import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { apiClient } from '../api/client'
import PageHeader from '../components/ui/PageHeader'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'

type HistoryItem = {
  _id: string
  question: string
  answer: string
  createdAt: string
  documentId: { _id?: string; title?: string; fileName?: string } | string
}

type DocumentOption = { _id: string; title: string }

export default function History() {
  const [items, setItems] = useState<HistoryItem[]>([])
  const [documents, setDocuments] = useState<DocumentOption[]>([])
  const [search, setSearch] = useState('')
  const [documentId, setDocumentId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiClient
      .get('/documents')
      .then((response) =>
        setDocuments(response.data.data.map((item: DocumentOption) => ({ _id: item._id, title: item.title })))
      )
      .catch(() => {})
  }, [])

  const loadHistory = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params: Record<string, string> = {}
      if (search.trim()) params.search = search.trim()
      if (documentId) params.documentId = documentId
      const response = await apiClient.get('/history', { params })
      setItems(response.data.data)
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Unable to load history.'
        : 'Unable to load history.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [search, documentId])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadHistory()
    }, 250)

    return () => window.clearTimeout(timer)
  }, [loadHistory])

  const getDocumentTitle = (item: HistoryItem) => {
    if (typeof item.documentId === 'string') return 'Document'
    return item.documentId?.title || item.documentId?.fileName || 'Document'
  }

  return (
    <section className="page-shell">
      <PageHeader
        eyebrow="Conversation log"
        title="Interaction history"
        description="Search previous questions and answers, and filter conversations by document."
      />

      <div className="glass-card p-6">
        <div className="mb-5 grid gap-4 md:grid-cols-[1fr_220px]">
          <input
            className="input-field"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or answers…"
          />
          <select
            className="input-field"
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
          >
            <option value="">All documents</option>
            {documents.map((document) => (
              <option key={document._id} value={document._id}>
                {document.title}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <LoadingSpinner label="Loading history…" />
        ) : error ? (
          <EmptyState icon="⚠️" title="History unavailable" description={error} />
        ) : items.length === 0 ? (
          <EmptyState
            title="No conversations yet"
            description="Ask a question on the AI page to start building your searchable history."
            icon="🕘"
          />
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item._id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-200">
                    {getDocumentTitle(item)}
                  </span>
                  <span className="text-sm text-slate-400">{new Date(item.createdAt).toLocaleString()}</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Question</p>
                    <p className="mt-2 text-sm leading-7 text-white">{item.question}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Answer</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-300">{item.answer}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
