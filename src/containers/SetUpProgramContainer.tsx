import { FormEvent, useEffect, useState } from 'react'
import { calculateTrainingMax } from '../utils/calculateTrainingMax'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUser } from '../modules/userService'
import { createOrUpdateProgram } from '../modules/programService'
import SetupProgramPresentation from '../components/SetupProgramPresentation'
import { User } from '@supabase/supabase-js'

const SetupProgramContainer = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState<{
    user: User
  } | null>(null)
  const [estimatedOneRepMax, setEstimatedOneRepMax] = useState({
    squat: 0,
    bench: 0,
    deadlift: 0,
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

  const trainingMaxSquat = calculateTrainingMax(estimatedOneRepMax.squat)
  const trainingMaxBench = calculateTrainingMax(estimatedOneRepMax.bench)
  const trainingMaxDeadlift = calculateTrainingMax(estimatedOneRepMax.deadlift)

  const handleSetEstimatedOneRepMax = (lift: string, estimate: number) => {
    setEstimatedOneRepMax((prev) => ({
      ...prev,
      [lift]: estimate,
    }))
  }

  const handleSubmitTrainingMaxes = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      await createOrUpdateProgram(user.user.id, estimatedOneRepMax, startDate)
      navigate('/programs') // Navigate to programs page or appropriate route after successful submission
    } catch (error) {
      console.error('Something went wrong', error)
    }
  }

  return (
    <SetupProgramPresentation
      estimatedOneRepMax={estimatedOneRepMax}
      startDate={startDate}
      trainingMaxSquat={trainingMaxSquat}
      trainingMaxBench={trainingMaxBench}
      trainingMaxDeadlift={trainingMaxDeadlift}
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
