import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../modules/authService'
import LogoutPresentation from '../components/LogoutPresentation'

const LogoutContainer = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
      navigate('/login') // Redirect to login page after logout
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return <LogoutPresentation onLogout={handleLogout} />
}

export default LogoutContainer
