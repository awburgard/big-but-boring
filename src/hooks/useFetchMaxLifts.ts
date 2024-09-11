import { useEffect, useState } from 'react'
import supabase from '../client/supabase'
import { useGetUser } from './useGetUser'

interface FetchMaxLifts {
  squat: number
  bench: number
  deadlift: number
}

const fetchMaxLifts = async (userId?: string): Promise<FetchMaxLifts> => {
  try {
    const { data } = await supabase
      .from('estimate_one_rep_maxes')
      .select('bench, squat, deadlift')
      .eq('user_id', userId)
    return (
      data?.[0] ?? {
        squat: 0,
        deadlift: 0,
        bench: 0,
      }
    )
  } catch (error) {
    console.error('Error fetching lifts:', error)
    return {
      squat: 0,
      bench: 0,
      deadlift: 0,
    }
  }
}

export const useFetchMaxLifts = () => {
  const [trainingMaxes, setTrainingMaxes] = useState<FetchMaxLifts>({
    squat: 0,
    deadlift: 0,
    bench: 0,
  })
  const user = useGetUser()

  useEffect(() => {
    const fetchLifts = async () => {
      if (user?.id) {
        const data = await fetchMaxLifts(user.id)
        setTrainingMaxes(data)
      }
    }

    fetchLifts()
  }, [user])

  return trainingMaxes
}
