import { Grid2, Typography } from '@mui/material'

type WeekViewPresentationProps = {
  weekData: any[]
  onDayClick: (dayId: string) => void
}

const WeekViewPresentation = ({
  weekData,
  onDayClick,
}: WeekViewPresentationProps) => (
  <Grid2 container spacing={1}>
    <Grid2 size={12}>
      <Typography>Program Week</Typography>
    </Grid2>
    <Grid2 size={12}>
      {weekData.map((day) => (
        <div key={day.id} onClick={() => onDayClick(day.id)}>
          <h3>{day.name}</h3>
          <p>Status: {day.status}</p>
        </div>
      ))}
    </Grid2>
  </Grid2>
)

export default WeekViewPresentation
