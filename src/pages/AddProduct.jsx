import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import axios from 'axios'

const AddProduct = ({ showAlert }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    try {
      setLoading(true)
      await axios.post('https://backend-neusparx.onrender.com/api/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      showAlert('Product added successfully!', 'success')
      navigate('/products')
    } catch (error) {
      console.error('Error adding product:', error)
      showAlert('Error saving product', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 mt-2">Fill in the details below to add a new product to your inventory.</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <ProductForm 
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default AddProduct