import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { apiClient } from '../api/client'
import { toast } from 'react-hot-toast'
import PageHeader from '../components/ui/PageHeader'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import DocumentPreviewModal from '../components/DocumentPreviewModal'

type DocumentItem = {
  _id: string
  title: string
  fileName: string
  fileType: string
  createdAt: string
}

const fileTypeOptions = [
  { label: 'All types', value: '' },
  { label: 'PDF', value: 'pdf' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'Text', value: 'text' },
]

export default function Documents() {
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [search, setSearch] = useState('')
  const [fileType, setFileType] = useState('')
  const [loading, setLoading] = useState(false)
  const [listLoading, setListLoading] = useState(true)
  const [previewId, setPreviewId] = useState<string | null>(null)

  const loadDocuments = useCallback(async () => {
    setListLoading(true)
    try {
      const params: Record<string, string> = {}
      if (search.trim()) params.search = search.trim()
      if (fileType) params.fileType = fileType
      const response = await apiClient.get('/documents', { params })
      setDocuments(response.data.data)
    } catch {
      toast.error('Unable to load documents.')
    } finally {
      setListLoading(false)
    }
  }, [search, fileType])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadDocuments()
    }, 250)

    return () => window.clearTimeout(timer)
  }, [loadDocuments])

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file) {
      toast.error('Select a document first')
      return
    }
    setLoading(true)
    try {
      const body = new FormData()
      body.append('file', file)
      if (title.trim()) body.append('title', title.trim())
      await apiClient.post('/documents', body, { headers: { 'Content-Type': 'multipart/form-data' } })
      setFile(null)
      setTitle('')
      await loadDocuments()
      toast.success('Document uploaded successfully')
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Upload failed. Please try again.'
        : 'Upload failed. Please try again.'
      toast.error(message)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/documents/${id}`)
      setDocuments((prev) => prev.filter((doc) => doc._id !== id))
      toast.success('Document removed')
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Delete failed.'
        : 'Delete failed.'
      toast.error(message)
    }
  }

  return (
    <section className="page-shell">
      <PageHeader
        eyebrow="Library"
        title="Documents"
        description="Upload PDF, Markdown, or text files. Search, filter, preview, and manage your knowledge base."
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <form className="glass-card space-y-5 p-6" onSubmit={handleUpload}>
          <h2 className="text-lg font-semibold text-white">Upload document</h2>
          <label className="block space-y-2 text-sm font-medium text-slate-200">
            Title (optional)
            <input
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document title"
            />
          </label>
          <label className="block space-y-2 text-sm font-medium text-slate-200">
            File
            <input
              className="input-field file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-400"
              type="file"
              accept=".pdf,.md,.markdown,.txt"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              required
            />
          </label>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Uploading…' : 'Upload document'}
          </button>
        </form>

        <div className="glass-card p-6">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row">
            <input
              className="input-field"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or filename…"
            />
            <select
              className="input-field sm:max-w-[180px]"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
            >
              {fileTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {listLoading ? (
            <LoadingSpinner label="Loading documents…" />
          ) : documents.length === 0 ? (
            <EmptyState
              title="No documents found"
              description="Try a different search or upload a new file to get started."
              icon="📄"
            />
          ) : (
            <ul className="space-y-3">
              {documents.map((doc) => (
                <li
                  key={doc._id}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-white">{doc.title}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        {doc.fileName} • {doc.fileType.toUpperCase()} • {new Date(doc.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" className="btn-secondary" onClick={() => setPreviewId(doc._id)}>
                        Preview
                      </button>
                      <button type="button" className="btn-danger" onClick={() => handleDelete(doc._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <DocumentPreviewModal documentId={previewId} onClose={() => setPreviewId(null)} />
    </section>
  )
}
