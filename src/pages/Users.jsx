import { useState, useEffect } from 'react'
import axios from 'axios'

const Users = ({ showAlert }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://backend-neusparx.onrender.com/api/users/all')
      // Ensure we always set an array
      setUsers(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error('Error fetching users:', error)
      showAlert('Error fetching users', 'error')
      setUsers([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://backend-neusparx.onrender.com/api/users/${userId}`)
        showAlert('User deleted successfully!', 'success')
        fetchUsers()
      } catch (error) {
        console.error('Error deleting user:', error)
        showAlert('Error deleting user', 'error')
      }
    }
  }

  if (loading) {
    return <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  }

  // Add safety check before rendering
  if (!Array.isArray(users)) {
    return <div className="text-center py-12">
      <p className="text-red-600">Error loading users data</p>
    </div>
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Users Management</h1>
      
      {users.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No users found</p>
        </div>
      ) : (
        <>
          {/* Mobile Cards View */}
          <div className="block sm:hidden space-y-4">
            {users.map((user) => (
              <div key={user._id} className="bg-white p-4 rounded-lg shadow-md border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{user.email}</p>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 text-sm"
                >
                  Delete User
                </button>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Users

