import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import PageHeader from '../components/ui/PageHeader'

export default function Register() {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    try {
      await register({ name, email, password })
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Registration failed. Please check your details and try again.'
        : 'Registration failed. Please check your details and try again.'
      toast.error(message)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-shell">
      <div className="mx-auto w-full max-w-md">
        <PageHeader
          eyebrow="Get started"
          title="Create your KnowledgeHub account"
          description="Start uploading documents and asking AI-powered questions in minutes."
        />

        <form className="glass-card mt-8 space-y-5 p-6" onSubmit={handleSubmit}>
          <label className="block space-y-2 text-sm font-medium text-slate-200">
            Name
            <input
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              placeholder="Your name"
            />
          </label>
          <label className="block space-y-2 text-sm font-medium text-slate-200">
            Email
            <input
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="you@company.com"
            />
          </label>
          <label className="block space-y-2 text-sm font-medium text-slate-200">
            Password
            <input
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              minLength={8}
              placeholder="Minimum 8 characters"
            />
          </label>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Creating account…' : 'Create account'}
          </button>
          <p className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-300 hover:text-indigo-200">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}
