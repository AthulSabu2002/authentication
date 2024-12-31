import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Page Not Found</p>
        <Link to="/login" className="text-blue-500 hover:text-blue-700">
          Go back to Login
        </Link>
      </div>
    </div>
  )
}

export default NotFound
