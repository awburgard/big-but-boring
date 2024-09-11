import { useEffect } from 'react'
import { useDetermineWeek } from '../hooks/useDetermineWeek'
import { useFetchMaxLifts } from '../hooks/useFetchMaxLifts'
import { calculateWeightForActiveSets } from '../utils/calculateWeightForActiveSets'
import { useNavigate } from 'react-router-dom'

export const TrainingWeek = () => {
  const navigate = useNavigate()
  const trainingMaxes = useFetchMaxLifts()
  const { week, redirectToSetup } = useDetermineWeek()

  useEffect(() => {
    if (redirectToSetup) {
      navigate('setup?new-program')
    }
  }, [redirectToSetup])

  const squatWeights = calculateWeightForActiveSets({
    week,
    trainingMax: trainingMaxes.squat,
  })
  const deadliftWeights = calculateWeightForActiveSets({
    week,
    trainingMax: trainingMaxes.deadlift,
  })
  const benchWeights = calculateWeightForActiveSets({
    week,
    trainingMax: trainingMaxes.bench,
  })

  const lifts = {
    squat: squatWeights,
    deadlift: deadliftWeights,
    bench: benchWeights,
  }

  return (
    <div>
      These are your lifts for {week}:
      <div>
        {Object.entries(lifts).map(([lift, percentages]) => (
          <div key={lift}>
            <h3>{lift}</h3>
            <ul>
              <li>{percentages.first}</li>
              <li>{percentages.second}</li>
              <li>{percentages.third}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
