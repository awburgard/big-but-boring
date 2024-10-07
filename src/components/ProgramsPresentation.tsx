import {
  Avatar,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'

import React from 'react'

interface ProgramsPresentationProps {
  programs: any[]
  estimatedMaxes: any | null
  loading: boolean
  error: string | null
  onEndProgram: (programId: string) => void
}

const ProgramsPresentation: React.FC<ProgramsPresentationProps> = ({
  programs,
  estimatedMaxes,
  loading,
  error,
  onEndProgram,
}) => {
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Grid2 container spacing={2}>
      <Typography variant='h3'>Your Programs</Typography>
      {estimatedMaxes && (
        <Grid2 container size={12}>
          <Typography variant='h4'>Your Estimated One Rep Maxes</Typography>
          <Grid2 size={12}>
            <Typography>Squat: {estimatedMaxes.squat}</Typography>
            <Typography>Bench Press: {estimatedMaxes.bench_press}</Typography>
          </Grid2>
          <Grid2 size={12}>
            <Typography>Deadlift: {estimatedMaxes.deadlift}</Typography>
            <Typography>
              Shoulder Press: {estimatedMaxes.shoulder_press}
            </Typography>
          </Grid2>
        </Grid2>
      )}
      <List dense>
        {programs.map((program) => (
          <ListItem
            key={program.id}
            secondaryAction={
              program.status === 'active' && (
                <Tooltip title='End Program'>
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => onEndProgram(program.id)}
                    color='error'
                  >
                    <StopCircleIcon />
                  </IconButton>
                </Tooltip>
              )
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FitnessCenterIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`Start Date: ${new Date(
                program.start_date
              ).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Grid2>
  )
}

export default ProgramsPresentation
