import supabase from '../client/supabase'

export const getWeekView = async (programId: string, weekNumber: number) => {
  const { data, error } = await supabase
    .from('program_days')
    .select('*, current_day_lifts(*), program_weeks(week_number)')
    .eq('program_id', programId)
    .eq('program_weeks.week_number', weekNumber)

  if (error) {
    throw new Error(error.message)
  }
  return data
}
