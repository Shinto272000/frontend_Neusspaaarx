import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import Login from './pages/Login'
import Register from './pages/Register'
import Alert from './components/Alert'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import Users from './pages/Users'

function AppContent() {
  const [alert, setAlert] = useState(null)
  const { user, loading } = useAuth()

  const showAlert = (message, type) => {
    setAlert({ message, type })
    setTimeout(() => setAlert(null), 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        {alert && (
          <Alert 
            message={alert.message} 
            type={alert.type} 
            onClose={() => setAlert(null)} 
          />
        )}
        <Routes>
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/register" element={<Register showAlert={showAlert} />} />
          <Route path="*" element={<Login showAlert={showAlert} />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert(null)} 
        />
      )}
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Routes>
          <Route path="/" element={<Dashboard showAlert={showAlert} />} />
          <Route path="/products" element={<Products showAlert={showAlert} />} />
          <Route path="/add-product" element={
            <ProtectedRoute requiredRole="admin">
              <AddProduct showAlert={showAlert} />
            </ProtectedRoute>
          } />
          <Route path="/edit-product/:id" element={
            <ProtectedRoute requiredRole="admin">
              <EditProduct showAlert={showAlert} />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/register" element={<Register showAlert={showAlert} />} />
          <Route path="/profile" element={<Profile showAlert={showAlert} />} />
          <Route path="/users" element={
            <ProtectedRoute requiredRole="admin">
              <Users showAlert={showAlert} />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App





