import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductList from '../components/ProductList'
import axios from 'axios'

const Products = ({ showAlert }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const API_URL = 'https://backend-neusparx.onrender.com/api/products'

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/get`)
      setProducts(response.data)
    } catch (error) {
      showAlert('Error fetching products', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product) => {
    navigate(`/edit-product/${product._id}`)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setLoading(true)
        await axios.delete(`${API_URL}/${id}`)
        showAlert('Product deleted successfully!', 'success')
        fetchProducts()
      } catch (error) {
        showAlert('Error deleting product', 'error')
      } finally {
        setLoading(false)
      }
    }
  }

  // Filter products based on search
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Products</h1>
        <Link
          to="/add-product"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center"
        >
          Add New Product
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      <ProductList 
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Products


