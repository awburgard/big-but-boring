import { useEffect, useState } from 'react'
import supabase from '../client/supabase'
import { User } from '@supabase/supabase-js'

const getUser = async (): Promise<User | null> => {
  try {
    const { data } = await supabase.auth.getUser()
    return data.user
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export const useGetUser = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const userFromSupa = await getUser()
        setUser(userFromSupa)
      }
    }

    fetchUser()
  }, [user])

  return user
}
