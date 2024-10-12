import React from 'react'
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid2 as Grid,
  Alert,
} from '@mui/material'

interface ProgramDetailPresentationProps {
  programId: string
  maxes: { lift_name: string; training_max: number }[]
  loading: boolean
  error: string | null
}

const ProgramDetailPresentation: React.FC<ProgramDetailPresentationProps> = ({
  programId,
  maxes,
  loading,
  error,
}) => {
  if (loading) return <CircularProgress />
  if (error) return <Alert severity='error'>{error}</Alert>

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant='h4'>Program Details: {programId}</Typography>
      </Grid>
      <Grid size={12}>
        <Typography variant='h5'>Your Maxes</Typography>
        <List>
          {maxes.map((max) => (
            <ListItem key={max.lift_name}>
              <ListItemText
                primary={max.lift_name}
                secondary={`Training Max: ${max.training_max} lbs`}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  )
}

export default ProgramDetailPresentation
