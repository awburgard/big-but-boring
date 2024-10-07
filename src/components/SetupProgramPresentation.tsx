import { FormEvent } from 'react'

type SetupProgramPresentationProps = {
  estimatedOneRepMax: { squat: number; bench: number; deadlift: number }
  startDate: string
  trainingMaxSquat: number
  trainingMaxBench: number
  trainingMaxDeadlift: number
  showModal: boolean
  onSetEstimatedOneRepMax: (lift: string, estimate: number) => void
  onSetStartDate: (date: string) => void
  onSubmit: (e: FormEvent) => void
  onCloseModal: () => void
}

const SetupProgramPresentation = ({
  estimatedOneRepMax,
  startDate,
  trainingMaxSquat,
  trainingMaxBench,
  trainingMaxDeadlift,
  onSetEstimatedOneRepMax,
  onSetStartDate,
  onSubmit,
}: SetupProgramPresentationProps) => (
  <form onSubmit={onSubmit}>
    <div>
      <p>Choose program start date</p>
      <input
        type='date'
        value={startDate}
        onChange={(e) => onSetStartDate(e.target.value)}
        placeholder='Program start date'
      />
    </div>
    <div>
      <p>Set your estimated one rep max</p>
      <input
        type='number'
        value={estimatedOneRepMax.squat}
        onChange={(e) =>
          onSetEstimatedOneRepMax('squat', Number(e.target.value))
        }
        placeholder='Enter your estimated one rep max for your squat'
      />
      <p>This is your training max for your squat: {trainingMaxSquat}</p>
      <input
        type='number'
        value={estimatedOneRepMax.deadlift}
        onChange={(e) =>
          onSetEstimatedOneRepMax('deadlift', Number(e.target.value))
        }
        placeholder='Enter your estimated one rep max for your deadlift'
      />
      <p>This is your training max for your deadlift: {trainingMaxDeadlift}</p>
      <input
        type='number'
        value={estimatedOneRepMax.bench}
        onChange={(e) =>
          onSetEstimatedOneRepMax('bench', Number(e.target.value))
        }
        placeholder='Enter your estimated one rep max for your bench'
      />
      <p>This is your training max for your bench: {trainingMaxBench}</p>
      <button type='submit'>Submit maxes</button>
    </div>
  </form>
)

export default SetupProgramPresentation
