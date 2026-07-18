import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiClient } from '../api/client'
import LoadingSpinner from './ui/LoadingSpinner'

type PreviewDocument = {
  _id: string
  title: string
  fileName: string
  fileType: string
  content: string
  contentLength: number
  createdAt: string
}

type DocumentPreviewModalProps = {
  documentId: string | null
  onClose: () => void
}

export default function DocumentPreviewModal({ documentId, onClose }: DocumentPreviewModalProps) {
  const [document, setDocument] = useState<PreviewDocument | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!documentId) {
      setDocument(null)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    apiClient
      .get(`/documents/${documentId}`)
      .then((response) => setDocument(response.data.data))
      .catch((err) => {
        const message = axios.isAxiosError(err)
          ? err.response?.data?.message || 'Unable to load preview.'
          : 'Unable to load preview.'
        setError(message)
      })
      .finally(() => setLoading(false))
  }, [documentId])

  if (!documentId) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="glass-card flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">Preview</p>
            <h2 className="mt-1 text-xl font-semibold text-white">{document?.title || 'Document preview'}</h2>
            {document ? (
              <p className="mt-1 text-sm text-slate-400">
                {document.fileName} • {document.fileType.toUpperCase()} • {document.contentLength.toLocaleString()} chars
              </p>
            ) : null}
          </div>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          {loading ? <LoadingSpinner label="Loading preview…" /> : null}
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          {document && !loading ? (
            <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-7 text-slate-200">
              {document.content}
            </pre>
          ) : null}
        </div>
      </div>
    </div>
  )
}
