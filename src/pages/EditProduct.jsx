import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import axios from 'axios'

const EditProduct = ({ showAlert }) => {
  const [loading, setLoading] = useState(false)
  const [initialData, setInitialData] = useState({})
  const [fetchLoading, setFetchLoading] = useState(true)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setFetchLoading(true)
      const response = await axios.get(`https://backend-neusparx.onrender.com/api/products/${id}`)
      setInitialData(response.data)
    } catch (error) {
      console.error('Error fetching product:', error)
      showAlert('Error fetching product details', 'error')
      navigate('/products')
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmit = async (formData) => {
    try {
      setLoading(true)
      await axios.put(`https://backend-neusparx.onrender.com/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      showAlert('Product updated successfully!', 'success')
      navigate('/products')
    } catch (error) {
      console.error('Error updating product:', error)
      showAlert('Error updating product', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-600 mt-2">Update the product details below.</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <ProductForm 
          onSubmit={handleSubmit}
          loading={loading}
          initialData={initialData}
        />
      </div>
    </div>
  )
}

export default EditProduct