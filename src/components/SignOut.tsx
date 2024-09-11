import supabase from '../client/supabase'
import { useNavigate } from 'react-router-dom'

export const SignOut = () => {
  const navigate = useNavigate()
  const signOut = async () => {
    await supabase.auth.signOut()

    navigate('/login')
  }

  return <button onClick={signOut}>Sign Out</button>
}
