import { FormEvent, useEffect, useState } from 'react'
import { calculateTrainingMax } from '../utils/calculateTrainingMax'
import supabase from '../client/supabase'
import { useGetUser } from '../hooks/useGetUser'
import { useLocation, useNavigate } from 'react-router-dom'
import Modal from './Modal'

export const SetupProgram = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useGetUser()
  const [estimatedOneRepMax, setEstimatedOneRepMax] = useState({
    squat: 0,
    bench: 0,
    deadlift: 0,
  })
  const [startDate, setStartDate] = useState<string>(new Date().toDateString())
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (location.search === '?new-program') {
      setShowModal(true)
    }
  }, [location.search])

  const trainingMaxSquat = calculateTrainingMax(estimatedOneRepMax.squat)
  const trainingMaxBench = calculateTrainingMax(estimatedOneRepMax.bench)
  const trainingMaxDeadlift = calculateTrainingMax(estimatedOneRepMax.deadlift)

  const handleSetEstimatedOneRepMax = ({
    lift,
    estimate,
  }: {
    lift: string
    estimate: number
  }) => {
    setEstimatedOneRepMax((prev) => ({
      ...prev,
      [lift]: estimate,
    }))
  }

  const handleSubmitTrainingMaxes = async (e: FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.from('estimate_one_rep_maxes').upsert(
      {
        squat: estimatedOneRepMax.squat,
        deadlift: estimatedOneRepMax.deadlift,
        bench: estimatedOneRepMax.bench,
        user_id: user?.id,
      },
      {
        onConflict: 'user_id',
        ignoreDuplicates: false,
      }
    )

    const { error: programStartDateError } = await supabase
      .from('programs')
      .upsert(
        {
          start_date: startDate,
          user_id: user?.id,
        },
        {
          onConflict: 'user_id',
          ignoreDuplicates: false,
        }
      )

    if (error || programStartDateError) {
      throw new Error('something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmitTrainingMaxes}>
      <div>
        {showModal && (
          <Modal
            title='Congratulations!'
            content={
              <>
                <p>
                  It looks like your current program is out of range. Please
                  pick a new start date and enter new lifts.
                </p>
              </>
            }
            onClose={() => {
              navigate({ search: '' })
              setShowModal(false)
            }}
          />
        )}
        <p>choose program start date</p>
        <input
          type='date'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder='program start date'
        />
      </div>
      <div>
        <p>set your estimated one rep max</p>
        <input
          type='number'
          value={estimatedOneRepMax.squat}
          onChange={(e) =>
            handleSetEstimatedOneRepMax({
              lift: 'squat',
              estimate: Number(e.target.value),
            })
          }
          placeholder='enter your estimated one rep max for your squat'
        />
        <p>This is your training max for your squat: {trainingMaxSquat}</p>
        <input
          type='number'
          value={estimatedOneRepMax.deadlift}
          onChange={(e) =>
            handleSetEstimatedOneRepMax({
              lift: 'deadlift',
              estimate: Number(e.target.value),
            })
          }
          placeholder='enter your estimated one rep max for your deadlift'
        />
        <p>
          This is your training max for your deadlift: {trainingMaxDeadlift}
        </p>
        <input
          type='number'
          value={estimatedOneRepMax.bench}
          onChange={(e) =>
            handleSetEstimatedOneRepMax({
              lift: 'bench',
              estimate: Number(e.target.value),
            })
          }
          placeholder='enter your estimated one rep max for your bench'
        />
        <p>This is your training max for your bench: {trainingMaxBench}</p>
        <button type='submit'>submit maxes</button>
      </div>
    </form>
  )
}
