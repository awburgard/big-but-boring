import React, { useEffect, useState } from 'react'
import DayViewPresentation from '../components/DayViewPresentation'
import { useParams } from 'react-router-dom'
import { getLiftsForDay } from '../client/getLiftsForDay'

const DayViewContainer: React.FC = () => {
  const { programId, dayNumber, weekNumber } = useParams()
  const [dayData, setDayData] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDayView = async () => {
      try {
        setLoading(true)
        const data = await getLiftsForDay({
          programId: programId!,
          dayNumber: Number(dayNumber),
          weekNumber: Number(weekNumber),
        })
        setDayData(data)
      } catch (err) {
        setError((err as string) ?? 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchDayView()
  }, [programId, dayNumber])

  return (
    <DayViewPresentation dayData={dayData} loading={loading} error={error} />
  )
}

export default DayViewContainer
