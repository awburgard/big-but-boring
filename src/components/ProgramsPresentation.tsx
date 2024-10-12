import {
  Avatar,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import React from 'react'

interface ProgramsPresentationProps {
  programs: any[]
  loading: boolean
  error: string | null
  onEndProgram: (programId: string) => void
  onViewProgram: (programId: string) => void // Add onViewProgram prop
}

const ProgramsPresentation: React.FC<ProgramsPresentationProps> = ({
  programs,
  loading,
  error,
  onEndProgram,
  onViewProgram,
}) => {
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Grid2 container spacing={2}>
      <Typography variant='h3'>Your Programs</Typography>
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
            component={ListItemButton}
            onClick={() => onViewProgram(program.id)} // Navigate to the detail view when clicked
          >
            <ListItemAvatar>
              <Avatar variant='square' sizes='small'>
                <FitnessCenterIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>{program.id}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Grid2>
  )
}

export default ProgramsPresentation
