import supabase from '../client/supabase'

export const createOrUpdateProgram = async (
  userId: string,
  estimatedOneRepMax: {
    squat: number
    bench: number
    deadlift: number
    shoulder_press: number
  },
  startDate: string
) => {
  // Upsert estimated one rep max
  const { error: oneRepMaxError } = await supabase
    .from('estimated_one_rep_max')
    .upsert(
      {
        squat: estimatedOneRepMax.squat,
        deadlift: estimatedOneRepMax.deadlift,
        bench_press: estimatedOneRepMax.bench,
        shoulder_press: estimatedOneRepMax.shoulder_press,
        user_id: userId,
      },
      { onConflict: 'user_id' }
    )

  if (oneRepMaxError) throw oneRepMaxError

  // Upsert program
  const { error: programError } = await supabase.from('programs').upsert(
    {
      start_date: startDate,
      user_id: userId,
      status: 'active',
    },
    { onConflict: 'user_id' }
  )

  if (programError) throw programError
}

// Fetch the details of a week for a specific user
export const getWeekProgram = async (userId: string) => {
  const { data, error } = await supabase
    .from('program_days')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  return data
}

// Fetch details of a specific day
export const getDayProgram = async (userId: string, dayId: string) => {
  const { data, error } = await supabase
    .from('program_days')
    .select('*')
    .eq('user_id', userId)
    .eq('id', dayId)
    .single()

  if (error) throw error
  return data
}

// Update the status of a day (e.g., mark it as complete)
export const updateDayStatus = async (
  dayId: string,
  status: 'completed' | 'incomplete'
) => {
  const { error } = await supabase
    .from('program_days')
    .update({ status })
    .eq('id', dayId)

  if (error) throw error
}

// Add or edit notes for a day
export const updateDayNotes = async (dayId: string, notes: string) => {
  const { error } = await supabase
    .from('program_days')
    .update({ notes })
    .eq('id', dayId)

  if (error) throw error
}
