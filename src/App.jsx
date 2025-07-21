import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import Alert from './components/Alert'

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({ message, type })
    setTimeout(() => setAlert(null), 3000)
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
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard showAlert={showAlert} />} />
            <Route path="/products" element={<Products showAlert={showAlert} />} />
            <Route path="/add-product" element={<AddProduct showAlert={showAlert} />} />
            <Route path="/edit-product/:id" element={<EditProduct showAlert={showAlert} />} />
          </Routes>
        </main>
      </div>
   
  )
}

export default App

