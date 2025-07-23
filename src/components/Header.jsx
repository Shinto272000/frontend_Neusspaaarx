import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

const Header = () => {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Product Admin
          </h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/products') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Products
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/add-product"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/add-product') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Add Product
              </Link>
            )}
            <Link to="/profile" className="text-gray-500 hover:text-gray-700">Profile</Link>
            {user?.role === 'admin' && (
              <Link to="/users" className="text-gray-500 hover:text-gray-700">Users</Link>
            )}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name} ({user?.role})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
              >
                Logout
              </button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/products"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/products') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Products
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/add-product"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/add-product') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Add Product
              </Link>
            )}
            <Link to="/profile" className="block px-3 py-2 text-gray-500 hover:text-gray-700">Profile</Link>
            {user?.role === 'admin' && (
              <Link to="/users" className="block px-3 py-2 text-gray-500 hover:text-gray-700">Users</Link>
            )}
            <div className="px-3 py-2 border-t border-gray-200 mt-2 pt-4">
              <p className="text-sm text-gray-600 mb-2">
                Welcome, {user?.name} ({user?.role})
              </p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header



