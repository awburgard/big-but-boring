import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { logoutUser } from '../modules/authService'
import supabase from '../client/supabase'

const Layout = () => {
  const [user, setUser] = useState<any>(null)
  const [programId, setProgramId] = useState<string | null>(null)
  const [weekNumber, setWeekNumber] = useState<number | null>(null)

  // Fetch the user session and active program
  useEffect(() => {
    const fetchUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)

      if (session?.user) {
        // Fetch active program and week number (this assumes a single active program)
        const { data: programData } = await supabase
          .from('programs')
          .select('id, current_week')
          .eq('user_id', session.user.id)
          .eq('status', 'active')
          .single()

        if (programData) {
          setProgramId(programData.id)
          setWeekNumber(programData.current_week || 1) // Default to week 1 if current_week is not set
        }
      }
    }

    fetchUserSession()
  }, [])

  const handleLogout = async () => {
    try {
      await logoutUser()
      setUser(null) // Clear user state on logout
      setProgramId(null) // Clear program state
      setWeekNumber(null) // Clear week number
      console.log('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            5/3/1 Lift Tracker
          </Typography>
          {programId && weekNumber ? (
            <Button
              component={Link}
              to={`/programs/${programId}/weeks/${weekNumber}`}
              color='inherit'
            >
              Training Week
            </Button>
          ) : (
            <Button component={Link} to='/setup' color='inherit'>
              Setup Program
            </Button>
          )}

          <Button component={Link} to='/programs' color='inherit'>
            Programs
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
