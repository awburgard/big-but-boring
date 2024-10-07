import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { logoutUser } from './modules/authService' // Ensure correct path
import LogoutPresentation from './components/LogoutPresentation'
import supabase from './client/supabase' // Make sure to import your Supabase client

function App() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }

    fetchUserSession()
  }, [])

  const handleLogout = async () => {
    try {
      await logoutUser()
      setUser(null) // Clear user state on logout
      console.log('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/training-week'>Training Week</Link>
          </li>
          <li>
            <Link to='/setup'>Setup Program</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to='/logout' onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/sign-up'>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {user && <LogoutPresentation onLogout={handleLogout} />}
    </div>
  )
}

export default App
