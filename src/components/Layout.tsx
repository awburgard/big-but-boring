import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { logoutUser } from '../modules/authService'
import supabase from '../client/supabase'

const Layout = () => {
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
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            5/3/1 Lift Tracker
          </Typography>
          <Button component={Link} to='/' color='inherit'>
            Home
          </Button>
          <Button component={Link} to='/training-week' color='inherit'>
            Training Week
          </Button>
          <Button component={Link} to='/programs' color='inherit'>
            Programs
          </Button>
          <Button component={Link} to='/setup' color='inherit'>
            Setup Program
          </Button>
          {user ? (
            <Button onClick={handleLogout} color='inherit'>
              Logout
            </Button>
          ) : (
            <>
              <Button component={Link} to='/login' color='inherit'>
                Login
              </Button>
              <Button component={Link} to='/sign-up' color='inherit'>
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
