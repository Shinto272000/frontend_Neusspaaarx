import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Dashboard = ({ showAlert }) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await axios.get('https://backend-neusparx.onrender.com/api/products/get')
      const products = response.data
      
      setStats({
        totalProducts: products.length,
        totalValue: products.reduce((sum, product) => sum + parseFloat(product.price), 0)
      })
    } catch (error) {
      showAlert('Error fetching dashboard data', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link
          to="/add-product"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center"
        >
          Add New Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Total Products
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">{stats.totalProducts}</p>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Total Products Value
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">
            ${stats.totalValue.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

