import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getDayProgram,
  updateDayStatus,
  updateDayNotes,
} from '../modules/programService'
import DayViewPresentation from '../components/DayViewPresentation'
import { getUser } from '../modules/userService'

const DayViewContainer = () => {
  const { dayId } = useParams<{ dayId: string }>()
  const [dayData, setDayData] = useState<any>(null)
  const [notes, setNotes] = useState<string>('')
  const [status, setStatus] = useState<'completed' | 'incomplete'>('incomplete')

  useEffect(() => {
    const fetchUserAndDayData = async () => {
      try {
        const user = await getUser()

        if (user && dayId) {
          const data = await getDayProgram(user.user.id, dayId)
          setDayData(data)
          setNotes(data.notes || '')
          setStatus(data.status || 'incomplete')
        }
      } catch (error) {
        console.error('Error fetching day data:', error)
      }
    }

    fetchUserAndDayData()
  }, [dayId])

  const handleNotesChange = async (newNotes: string) => {
    try {
      setNotes(newNotes)
      if (dayId) {
        await updateDayNotes(dayId, newNotes)
      }
    } catch (error) {
      console.error('Error updating notes:', error)
    }
  }

  const handleStatusToggle = async () => {
    try {
      if (dayId) {
        const newStatus = status === 'incomplete' ? 'completed' : 'incomplete'
        setStatus(newStatus)
        await updateDayStatus(dayId, newStatus)
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  return (
    <DayViewPresentation
      dayData={dayData}
      notes={notes}
      status={status}
      onNotesChange={handleNotesChange}
      onStatusToggle={handleStatusToggle}
    />
  )
}

export default DayViewContainer
