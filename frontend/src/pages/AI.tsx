import axios from 'axios'
import { useEffect, useState } from 'react'
import { apiClient } from '../api/client'
import { toast } from 'react-hot-toast'
import PageHeader from '../components/ui/PageHeader'
import EmptyState from '../components/ui/EmptyState'

type DocumentOption = { _id: string; title: string }

type AnswerResult = { answer: string }

export default function AI() {
  const [documents, setDocuments] = useState<DocumentOption[]>([])
  const [selectedDocument, setSelectedDocument] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingDocs, setLoadingDocs] = useState(true)

  useEffect(() => {
    apiClient
      .get('/documents')
      .then((response) => {
        setDocuments(response.data.data.map((item: DocumentOption) => ({ _id: item._id, title: item.title })))
      })
      .catch(() => toast.error('Unable to load documents.'))
      .finally(() => setLoadingDocs(false))
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedDocument) {
      toast.error('Choose a document first')
      return
    }
    setLoading(true)
    try {
      const response = await apiClient.post('/ai/ask', {
        documentId: selectedDocument,
        question,
      })
      setAnswer((response.data.data as AnswerResult).answer)
      toast.success('Answer generated')
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'AI question failed. Please try again.'
        : 'AI question failed. Please try again.'
      toast.error(message)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-shell">
      <PageHeader
        eyebrow="Ask anything"
        title="AI Q&A"
        description="Select a document, ask a question, and get an answer grounded in your uploaded content."
      />

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <form className="glass-card space-y-5 p-6" onSubmit={handleSubmit}>
          <label className="block space-y-2 text-sm font-medium text-slate-200">
            Document
            <select
              className="input-field"
              value={selectedDocument}
              onChange={(e) => setSelectedDocument(e.target.value)}
              required
              disabled={loadingDocs}
            >
              <option value="">{loadingDocs ? 'Loading documents…' : 'Select a document'}</option>
              {documents.map((document) => (
                <option key={document._id} value={document._id}>
                  {document.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-2 text-sm font-medium text-slate-200">
            Question
            <textarea
              className="input-field min-h-[160px] resize-y"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              rows={5}
              placeholder="What would you like to know from this document?"
            />
          </label>
          <button type="submit" className="btn-primary w-full" disabled={loading || loadingDocs}>
            {loading ? 'Asking AI…' : 'Ask question'}
          </button>
        </form>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white">Answer</h2>
          {answer ? (
            <div className="mt-5 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-5">
              <p className="whitespace-pre-wrap text-sm leading-8 text-indigo-50">{answer}</p>
            </div>
          ) : (
            <EmptyState
              title="No answer yet"
              description="Choose a document, ask a question, and your AI response will appear here."
              icon="💬"
            />
          )}
        </div>
      </div>
    </section>
  )
}
