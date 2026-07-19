import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import PageHeader from '../components/ui/PageHeader'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    try {
      await login({ email, password })
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Login failed. Please check your credentials and try again.'
        : 'Login failed. Please check your credentials and try again.'
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
          eyebrow="Welcome back"
          title="Sign in to your workspace"
          description="Access your documents, AI conversations, and dashboard insights."
        />

        <form className="glass-card mt-8 space-y-5 p-6" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
            />
          </label>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
          <p className="text-center text-sm text-slate-400">
            New here?{' '}
            <Link to="/register" className="font-medium text-indigo-300 hover:text-indigo-200">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}
