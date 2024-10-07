import { Button, Grid2, TextField, Typography } from '@mui/material'
import { FormEvent } from 'react'

type SetupProgramPresentationProps = {
  estimatedOneRepMax: {
    squat: number
    bench: number
    deadlift: number
    shoulder_press: number
  }
  startDate: string
  trainingMaxSquat: number
  trainingMaxBench: number
  trainingMaxDeadlift: number
  trainingShoulderPress: number
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
  trainingShoulderPress,
  onSetEstimatedOneRepMax,
  onSetStartDate,
  onSubmit,
}: SetupProgramPresentationProps) => (
  <form onSubmit={onSubmit}>
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography>Choose program start date</Typography>
        <TextField
          type='date'
          value={startDate}
          onChange={(e) => onSetStartDate(e.target.value)}
          placeholder='Program start date'
        />
      </Grid2>
      <Grid2 size={12}>
        <Typography>Set your estimated one rep maxes</Typography>
      </Grid2>
      <Grid2 size={6}>
        <TextField
          type='number'
          value={estimatedOneRepMax.squat}
          onChange={(e) =>
            onSetEstimatedOneRepMax('squat', Number(e.target.value))
          }
          placeholder='Enter your estimated one rep max for your squat'
        />
        <Typography>
          This is your training max for your squat: {trainingMaxSquat}
        </Typography>
      </Grid2>
      <Grid2 size={6}>
        <TextField
          type='number'
          value={estimatedOneRepMax.deadlift}
          onChange={(e) =>
            onSetEstimatedOneRepMax('deadlift', Number(e.target.value))
          }
          placeholder='Enter your estimated one rep max for your deadlift'
        />
        <Typography>
          This is your training max for your deadlift: {trainingMaxDeadlift}
        </Typography>
      </Grid2>
      <Grid2 size={6}>
        <TextField
          type='number'
          value={estimatedOneRepMax.bench}
          onChange={(e) =>
            onSetEstimatedOneRepMax('bench', Number(e.target.value))
          }
          placeholder='Enter your estimated one rep max for your bench'
        />
        <Typography>
          This is your training max for your bench press: {trainingMaxBench}
        </Typography>
      </Grid2>
      <Grid2 size={6}>
        <TextField
          type='number'
          value={estimatedOneRepMax.shoulder_press}
          onChange={(e) =>
            onSetEstimatedOneRepMax('shoulder_press', Number(e.target.value))
          }
          placeholder='Enter your estimated one rep max for your shoulder preess'
        />
        <Typography>
          This is your training max for your shoulder press:{' '}
          {trainingShoulderPress}
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Button type='submit'>Submit maxes</Button>
      </Grid2>
    </Grid2>
  </form>
)

export default SetupProgramPresentation
