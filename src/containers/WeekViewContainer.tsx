import React, { useEffect, useState } from 'react'
import WeekViewPresentation from '../components/WeekViewPresentation'
import { useParams } from 'react-router-dom'
import { fetchWeeklyWorkoutSummary } from '../modules/programService'

const WeekViewContainer: React.FC = () => {
  const { programId, weekNumber } = useParams<{
    programId: string
    weekNumber: string
  }>()
  const [weekData, setWeekData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeekView = async () => {
      try {
        setLoading(true)
        if (programId && weekNumber) {
          const data = await fetchWeeklyWorkoutSummary(programId, weekNumber)
          setWeekData(data || [])
        }
      } catch (err) {
        console.error(err)
        setError('Failed to load week data.')
      } finally {
        setLoading(false)
      }
    }

    fetchWeekView()
  }, [programId, weekNumber])

  return (
    <WeekViewPresentation weekData={weekData} loading={loading} error={error} />
  )
}

export default WeekViewContainer
