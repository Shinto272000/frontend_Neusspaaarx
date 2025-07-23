import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

const Profile = ({ showAlert }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showAlert('Passwords do not match', 'error')
      return
    }

    try {
      setLoading(true)
      await axios.put('/api/users/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
      showAlert('Password changed successfully!', 'success')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      showAlert(error.response?.data?.message || 'Error changing password', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Profile</h1>
      
      {/* User Info */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">User Information</h2>
        <div className="space-y-2">
          <p className="text-sm sm:text-base"><strong>Name:</strong> {user?.name}</p>
          <p className="text-sm sm:text-base"><strong>Email:</strong> {user?.email}</p>
          <p className="text-sm sm:text-base"><strong>Role:</strong> {user?.role}</p>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile
