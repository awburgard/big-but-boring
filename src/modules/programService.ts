import supabase from '../client/supabase'

// Helper for error handling
const handleSupabaseError = (error: any) => {
  if (error) throw new Error(error.message)
}

export const createProgramWithWorkouts = async (
  userId: string,
  lifts: Record<string, number>
) => {
  try {
    // Create a new program for the user using a Supabase RPC function -- this will also run our trigger
    const { data: programId, error: programError } = await supabase.rpc(
      'create_new_program',
      {
        _user_id: userId,
        _lifts: lifts,
      }
    )

    handleSupabaseError(programError)

    // No need to manually call create_program_workouts since the trigger handles this

    return programId // Return the newly created program
  } catch (error) {
    console.error('Error creating program with workouts:', error)
    throw error
  }
}

// Cancel an active program
export const cancelProgram = async (programId: string) => {
  const { error } = await supabase.rpc('cancel_program', {
    _program_id: programId,
  })
  handleSupabaseError(error)
}

// Mark a workout as complete
export const markWorkoutComplete = async (workoutId: string) => {
  const { error } = await supabase.rpc('mark_workout_complete', {
    _workout_id: workoutId,
  })
  handleSupabaseError(error)
}

// Fetch weekly workouts for the active program
export const getWeeklyWorkouts = async () => {
  const { data, error } = await supabase
    .from('weekly_workouts_view')
    .select('*')
  handleSupabaseError(error)
  return data
}

// Fetch historical maxes trends
export const getHistoricalMaxes = async () => {
  const { data, error } = await supabase
    .from('historical_maxes_trend_view')
    .select('*')
  handleSupabaseError(error)
  return data
}

// Check active program status
export const getActiveProgramStatus = async () => {
  const { data, error } = await supabase
    .from('active_program_status_view')
    .select('*')
  handleSupabaseError(error)
  return data
}

// Complete the program if all workouts are done
export const completeProgramIfAllWorkoutsDone = async (programId: string) => {
  const { error } = await supabase.rpc(
    'complete_program_if_all_workouts_done',
    { _program_id: programId }
  )
  handleSupabaseError(error)
}

// Fetch all programs for the user (active, completed, or canceled)
export const fetchPrograms = async () => {
  const { data, error } = await supabase.from('user_programs_view').select('*')
  handleSupabaseError(error)
  return data
}

// Fetch a specific program
export const fetchProgram = async (programId: string) => {
  const { data, error } = await supabase
    .from('user_programs_view')
    .select('*')
    .eq('id', programId)
  handleSupabaseError(error)
  return data
}

// Fetch program maxes for a specific program
export const fetchProgramMaxes = async (programId: string) => {
  const { data, error } = await supabase
    .from('lifts')
    .select('lift_name, training_max')
    .eq('program_id', programId)
  handleSupabaseError(error)
  return data
}

// Fetch weekly workout summary for a given program and week
export const fetchWeeklyWorkoutSummary = async (
  programId: string,
  weekNumber: string
) => {
  const { data, error } = await supabase
    .from('weekly_workout_summary')
    .select('*')
    .eq('program_id', programId) // Filter by program ID
    .eq('week_number', weekNumber) // Filter by week number

  handleSupabaseError(error)

  return data
}
