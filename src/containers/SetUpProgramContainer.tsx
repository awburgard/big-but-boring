import { FormEvent, useEffect, useState } from 'react'
import { calculateTrainingMax } from '../utils/calculateTrainingMax'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUser } from '../modules/userService'
import { createProgramWithWorkouts } from '../modules/programService'
import SetupProgramPresentation from '../components/SetupProgramPresentation'
import { User } from '@supabase/supabase-js'

const SetupProgramContainer = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState<{
    user: User
  } | null>(null)
  const [lifts, setLifts] = useState({
    Squat: 0,
    Bench: 0,
    Deadlift: 0,
    OHP: 0,
  })
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  )
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser()
      setUser(userData)
    }
    fetchUser()

    if (location.search === '?new-program') {
      setShowModal(true)
    }
  }, [location.search])

  const trainingMaxSquat = calculateTrainingMax(lifts.Squat)
  const trainingMaxBench = calculateTrainingMax(lifts.Bench)
  const trainingMaxDeadlift = calculateTrainingMax(lifts.Deadlift)
  const trainingShoulderPress = calculateTrainingMax(lifts.OHP)

  const handleSetEstimatedOneRepMax = (lift: string, estimate: number) => {
    setLifts((prev) => ({
      ...prev,
      [lift]: estimate,
    }))
  }

  const handleSubmitTrainingMaxes = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const programId = await createProgramWithWorkouts(user.user.id, lifts)
      navigate(`/programs/${programId}/weeks/1/days/1`)
    } catch (error) {
      console.error('Something went wrong', error)
    }
  }

  return (
    <SetupProgramPresentation
      lifts={lifts}
      startDate={startDate}
      trainingMaxSquat={trainingMaxSquat}
      trainingMaxBench={trainingMaxBench}
      trainingMaxDeadlift={trainingMaxDeadlift}
      trainingShoulderPress={trainingShoulderPress}
      showModal={showModal}
      onSetEstimatedOneRepMax={handleSetEstimatedOneRepMax}
      onSetStartDate={setStartDate}
      onSubmit={handleSubmitTrainingMaxes}
      onCloseModal={() => {
        navigate({ search: '' })
        setShowModal(false)
      }}
    />
  )
}

export default SetupProgramContainer
