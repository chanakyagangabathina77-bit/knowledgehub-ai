import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'

export default function NotFound() {
  return (
    <section className="page-shell">
      <div className="mx-auto max-w-xl text-center">
        <PageHeader
          eyebrow="404"
          title="Page not found"
          description="The page you are looking for does not exist or may have been moved."
        />
        <Link to="/" className="btn-primary mt-8 inline-flex">
          Return home
        </Link>
      </div>
    </section>
  )
}
