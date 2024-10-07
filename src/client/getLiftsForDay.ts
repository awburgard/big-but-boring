import supabase from './supabase'

// Function to fetch the lifts for a specific user, week, and day
const getLiftsForDay = async (
  userId: string,
  weekNumber: number,
  dayNumber: number
) => {
  const { data, error } = await supabase
    .from('current_day_lifts')
    .select('lift_name, percentage, reps, notes')
    .eq('user_id', userId)
    .eq('week_number', weekNumber)
    .eq('day_number', dayNumber)

  if (error) {
    console.error('Error fetching lifts:', error)
    return []
  }

  return data
}

export default getLiftsForDay
