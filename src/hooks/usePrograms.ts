import { useEffect, useState } from 'react'
import supabase from '../client/supabase'

const usePrograms = () => {
  const [programs, setPrograms] = useState<any[]>([])
  const [estimatedMaxes, setEstimatedMaxes] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProgramsAndMaxes = async () => {
      setLoading(true)
      const { data, error } = await supabase.auth.getUser()
      if (!data || error) {
        setError('User not authenticated.')
        setLoading(false)
        return
      }

      // Fetch programs
      const { data: programsData, error: programsError } = await supabase
        .from('programs')
        .select('*')
        .eq('user_id', data.user.id)
        .order('start_date', { ascending: false })

      if (programsError) {
        setError(programsError.message)
      } else {
        setPrograms(programsData)
      }

      // Fetch estimated one rep maxes
      const { data: maxesData, error: maxesError } = await supabase
        .from('estimated_one_rep_max')
        .select('*')
        .eq('user_id', data.user.id)
        .single() // Assuming one entry per user

      if (maxesError) {
        setError(maxesError.message)
      } else {
        setEstimatedMaxes(maxesData)
      }

      setLoading(false)
    }

    fetchProgramsAndMaxes()
  }, [])

  const markProgramAsCompleted = async (programId: string) => {
    const { error } = await supabase
      .from('programs')
      .update({ completed: true, status: 'completed' })
      .eq('id', programId)

    if (error) {
      console.error('Error marking program as completed:', error.message)
      return false // Indicate failure
    }

    setPrograms((prev) =>
      prev.map((program) =>
        program.id === programId ? { ...program, completed: true } : program
      )
    )

    return true // Indicate success
  }

  return { programs, estimatedMaxes, error, loading, markProgramAsCompleted }
}

export default usePrograms
