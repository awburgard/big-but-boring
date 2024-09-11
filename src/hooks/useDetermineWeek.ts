import { useEffect, useState } from 'react'
import supabase from '../client/supabase'
import { useGetUser } from './useGetUser'

const getProgramStartDate = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('start_date')
      .eq('user_id', userId)

    if (data && !error) {
      return data[0].start_date
    }

    return 'week-one'
  } catch (error) {
    console.error(error)
    return 'week-one'
  }
}

export const useDetermineWeek = () => {
  const [week, setWeek] = useState<string>('week-one')
  const [redirectToSetup, setRedirectToSetup] = useState<boolean>(false)
  const user = useGetUser()

  useEffect(() => {
    const fetchStartDate = async () => {
      if (user?.id) {
        const startDate = await getProgramStartDate(user.id)
        if (startDate) {
          const today = new Date()
          const start = new Date(startDate)
          const diffInMs = today.getTime() - start.getTime()
          const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

          if (diffInDays <= 7) {
            setWeek('week-one')
          } else if (diffInDays >= 8 && diffInDays <= 14) {
            setWeek('week-two')
          } else if (diffInDays >= 15 && diffInDays <= 21) {
            setWeek('week-three')
          } else if (diffInDays >= 22 && diffInDays <= 28) {
            setWeek('week-four')
          } else {
            setWeek('week-out-of-range') // In case it's beyond the 28 days.
            setRedirectToSetup(true)
          }
        }
      }
    }

    fetchStartDate()
  }, [user])

  return { week, redirectToSetup }
}
