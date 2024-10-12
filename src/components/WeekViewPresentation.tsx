import React from 'react'
import {
  Grid2 as Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material'

interface WeekViewPresentationProps {
  weekData: {
    workout_id: string
    day_number: number
    week_number: number
    lift_name: string
    reps: number
    percentage: number
    completed: boolean
  }[]
  loading: boolean
  error: string | null
}

const WeekViewPresentation: React.FC<WeekViewPresentationProps> = ({
  weekData,
  loading,
  error,
}) => {
  if (loading) return <CircularProgress /> // Material UI loading spinner
  if (error) return <Alert severity='error'>{error}</Alert> // Material UI Alert component

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography variant='h4' gutterBottom>
          Week {weekData.length > 0 ? weekData[0].week_number : ''} Overview
        </Typography>
      </Grid>

      {weekData.length === 0 ? (
        <Grid size={12}>
          <Typography variant='body1'>
            No data available for this week.
          </Typography>
        </Grid>
      ) : (
        weekData.map((day) => (
          <Grid size={12} key={day.workout_id}>
            <Card>
              <CardContent>
                <Typography variant='h5' gutterBottom>
                  Day {day.day_number}
                </Typography>

                <Typography variant='body1'>Lift: {day.lift_name}</Typography>
                <Typography variant='body2'>Reps: {day.reps}</Typography>
                <Typography variant='body2'>
                  Percentage: {day.percentage}%
                </Typography>
                <Typography
                  variant='body2'
                  color={day.completed ? 'success.main' : 'error.main'}
                >
                  Status: {day.completed ? 'Completed' : 'Incomplete'}
                </Typography>

                <Divider style={{ margin: '8px 0' }} />
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  )
}

export default WeekViewPresentation
