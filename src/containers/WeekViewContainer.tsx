import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWeekProgram } from '../modules/programService'
import WeekViewPresentation from '../components/WeekViewPresentation'
import { getUser } from '../modules/userService'

const WeekViewContainer = () => {
  const [weekData, setWeekData] = useState<any[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserAndProgram = async () => {
      const user = await getUser()
      if (user) {
        const data = await getWeekProgram(user.user.id)
        setWeekData(data)
      }
    }
    fetchUserAndProgram()
  }, [])

  const handleDayClick = (dayId: string) => {
    navigate(`/day/${dayId}`)
  }

  return (
    <WeekViewPresentation weekData={weekData} onDayClick={handleDayClick} />
  )
}

export default WeekViewContainer
